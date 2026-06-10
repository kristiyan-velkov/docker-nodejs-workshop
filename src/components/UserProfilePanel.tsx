import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getSupabase } from "../lib/supabase";
import {
  WORKSHOP_TASK_COUNT,
  WORKSHOP_TASK_LABELS,
} from "../constants/workshopTasksMeta";
import type { TaskProgressRow } from "../types/database";

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

export const UserProfilePanel = () => {
  const { profile, user, isAdmin } = useAuth();
  const [progress, setProgress] = useState<TaskProgressRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const supabase = getSupabase();
      if (!supabase || !user) return;

      setLoading(true);
      const { data } = await supabase
        .from("task_progress")
        .select("*")
        .eq("user_id", user.id)
        .order("task_id");

      setProgress(data ?? []);
      setLoading(false);
    };
    void load();
  }, [user?.id]);

  const completedCount = progress.filter((p) => p.completed).length;
  const totalSeconds = progress.reduce((sum, p) => {
    return sum + (p.completed && p.completion_time ? p.completion_time : p.elapsed_time);
  }, 0);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h3 className="text-xl font-bold text-slate-800 mb-4">Your profile</h3>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-slate-500">Name</dt>
            <dd className="font-medium text-slate-800">{profile?.full_name || "—"}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Email</dt>
            <dd className="font-medium text-slate-800">{profile?.email || user?.email}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Role</dt>
            <dd className="font-medium text-slate-800 capitalize">{profile?.role}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Progress</dt>
            <dd className="font-medium text-slate-800">
              {completedCount} / {WORKSHOP_TASK_COUNT} tasks completed
            </dd>
          </div>
          <div>
            <dt className="text-slate-500">Total time tracked</dt>
            <dd className="font-mono font-medium text-blue-600">
              {formatTime(totalSeconds)}
            </dd>
          </div>
        </dl>
        {isAdmin && (
          <p className="mt-4 text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
            You have the <strong>admin</strong> role. Open the Admin panel to see all
            participants and questions.
          </p>
        )}
      </div>

      <div>
        <h4 className="text-lg font-bold text-slate-800 mb-4">Task progress</h4>
        {loading ? (
          <p className="text-slate-500 text-sm">Loading…</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-700">Task</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-700">Status</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-700">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {Array.from({ length: WORKSHOP_TASK_COUNT }, (_, i) => i + 1).map(
                  (taskId) => {
                    const row = progress.find((p) => p.task_id === taskId);
                    const time = row
                      ? row.completed && row.completion_time
                        ? row.completion_time
                        : row.elapsed_time
                      : 0;
                    return (
                      <tr key={taskId} className="bg-white">
                        <td className="px-4 py-3 text-slate-800">
                          <span className="font-medium">#{taskId}</span>{" "}
                          {WORKSHOP_TASK_LABELS[taskId]}
                        </td>
                        <td className="px-4 py-3">
                          {row?.completed ? (
                            <span className="font-medium text-emerald-700">Done</span>
                          ) : row && row.elapsed_time > 0 ? (
                            <span className="text-blue-600">In progress</span>
                          ) : (
                            <span className="text-slate-400">Not started</span>
                          )}
                        </td>
                        <td className="px-4 py-3 font-mono text-slate-700">
                          {time > 0 ? formatTime(time) : "—"}
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
