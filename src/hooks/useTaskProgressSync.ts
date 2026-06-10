import { useCallback, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getSupabase } from "../lib/supabase";

export interface TimerState {
  isRunning: boolean;
  elapsedTime: number;
  completed?: boolean;
  completionTime?: number;
}

export function useTaskProgressSync(
  timers: Record<number, TimerState>,
  setTimers: React.Dispatch<React.SetStateAction<Record<number, TimerState>>>
) {
  const { user, configured } = useAuth();
  const loadedRef = useRef(false);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const loadProgress = useCallback(async () => {
    const supabase = getSupabase();
    if (!supabase || !user) return;

    const { data, error } = await supabase
      .from("task_progress")
      .select("task_id, elapsed_time, completed, completion_time")
      .eq("user_id", user.id);

    if (error) {
      console.error("Failed to load task progress:", error.message);
      return;
    }

    const restored: Record<number, TimerState> = {};
    for (const row of data ?? []) {
      restored[row.task_id] = {
        isRunning: false,
        elapsedTime: row.elapsed_time,
        completed: row.completed,
        completionTime: row.completion_time ?? undefined,
      };
    }
    setTimers(restored);
    loadedRef.current = true;
  }, [user, setTimers]);

  useEffect(() => {
    loadedRef.current = false;
    if (configured && user) {
      void loadProgress();
    }
  }, [configured, user, loadProgress]);

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase || !user || !loadedRef.current) return;

    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);

    saveTimeoutRef.current = setTimeout(async () => {
      const rows = Object.entries(timers).map(([taskId, timer]) => ({
        user_id: user.id,
        task_id: Number(taskId),
        elapsed_time: timer.elapsedTime,
        completed: timer.completed ?? false,
        completion_time: timer.completionTime ?? null,
      }));

      if (rows.length === 0) return;

      const { error } = await supabase.from("task_progress").upsert(rows, {
        onConflict: "user_id,task_id",
      });

      if (error) {
        console.error("Failed to save task progress:", error.message);
      }
    }, 600);

    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, [timers, user]);

  const clearRemoteProgress = useCallback(async () => {
    const supabase = getSupabase();
    if (!supabase || !user) return;

    const { error } = await supabase
      .from("task_progress")
      .delete()
      .eq("user_id", user.id);

    if (error) {
      console.error("Failed to clear task progress:", error.message);
    }
    loadedRef.current = true;
  }, [user]);

  return { clearRemoteProgress, reloadProgress: loadProgress };
}
