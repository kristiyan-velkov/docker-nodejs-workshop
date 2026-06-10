import { useEffect, useState } from "react";
import { getSupabase } from "../lib/supabase";
import {
  WORKSHOP_TASK_COUNT,
  WORKSHOP_TASK_LABELS,
} from "../constants/workshopTasksMeta";
import type { Profile, TaskProgressRow, WorkshopQuestion } from "../types/database";

interface ParticipantRow extends Profile {
  progress: TaskProgressRow[];
}

interface QuestionWithProfile extends WorkshopQuestion {
  profile?: Pick<Profile, "email" | "full_name"> | null;
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

export const AdminDashboard = () => {
  const [participants, setParticipants] = useState<ParticipantRow[]>([]);
  const [questions, setQuestions] = useState<QuestionWithProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<"progress" | "questions">(
    "progress"
  );

  useEffect(() => {
    const load = async () => {
      const supabase = getSupabase();
      if (!supabase) return;

      setLoading(true);

      const [
        { data: profiles },
        { data: allProfiles },
        { data: allProgress },
        { data: allQuestions },
      ] = await Promise.all([
        supabase
          .from("profiles")
          .select("*")
          .eq("role", "participant")
          .order("created_at", { ascending: false }),
        supabase.from("profiles").select("id, email, full_name"),
        supabase.from("task_progress").select("*"),
        supabase
          .from("workshop_questions")
          .select("*")
          .order("created_at", { ascending: false }),
      ]);

      const progressByUser = new Map<string, TaskProgressRow[]>();
      for (const row of allProgress ?? []) {
        const list = progressByUser.get(row.user_id) ?? [];
        list.push(row);
        progressByUser.set(row.user_id, list);
      }

      setParticipants(
        (profiles ?? []).map((p) => ({
          ...p,
          progress: progressByUser.get(p.id) ?? [],
        }))
      );

      const profileMap = new Map(
        (allProfiles ?? []).map((p) => [
          p.id,
          { email: p.email, full_name: p.full_name },
        ])
      );

      setQuestions(
        (allQuestions ?? []).map((q) => ({
          ...q,
          profile: profileMap.get(q.user_id) ?? null,
        }))
      );

      setLoading(false);
    };

    void load();
  }, []);

  if (loading) {
    return <p className="text-slate-500 text-center py-12">Loading admin data…</p>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-xl">
        <h3 className="text-xl font-bold text-slate-800 mb-2">🛠️ Admin panel</h3>
        <p className="text-slate-600 text-sm">
          Track participant progress across all 10 tasks and review questions from
          the workshop floor.
        </p>
      </div>

      <div className="flex gap-2 flex-wrap">
        <button
          type="button"
          onClick={() => setActiveSection("progress")}
          className={`px-4 py-2 rounded-xl font-semibold text-sm ${
            activeSection === "progress"
              ? "bg-blue-600 text-white"
              : "bg-slate-100 text-slate-700"
          }`}
        >
          Participant progress ({participants.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveSection("questions")}
          className={`px-4 py-2 rounded-xl font-semibold text-sm ${
            activeSection === "questions"
              ? "bg-blue-600 text-white"
              : "bg-slate-100 text-slate-700"
          }`}
        >
          Questions ({questions.length})
        </button>
      </div>

      {activeSection === "progress" && (
        <div className="space-y-4">
          {participants.length === 0 ? (
            <p className="text-slate-500 text-sm">No participants yet.</p>
          ) : (
            participants.map((p) => {
              const completed = p.progress.filter((r) => r.completed).length;
              return (
                <div
                  key={p.id}
                  className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm"
                >
                  <div className="flex flex-wrap justify-between gap-2 mb-4">
                    <div>
                      <p className="font-bold text-slate-800">
                        {p.full_name || p.email || "Unknown"}
                      </p>
                      <p className="text-sm text-slate-500">{p.email}</p>
                    </div>
                    <p className="text-sm font-semibold text-blue-600">
                      {completed} / {WORKSHOP_TASK_COUNT} completed
                    </p>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {Array.from({ length: WORKSHOP_TASK_COUNT }, (_, i) => i + 1).map(
                      (taskId) => {
                        const row = p.progress.find((r) => r.task_id === taskId);
                        return (
                          <div
                            key={taskId}
                            title={WORKSHOP_TASK_LABELS[taskId]}
                            className={`text-xs rounded-lg px-2 py-2 border ${
                              row?.completed
                                ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                                : row && row.elapsed_time > 0
                                ? "bg-blue-50 border-blue-200 text-blue-800"
                                : "bg-slate-50 border-slate-200 text-slate-500"
                            }`}
                          >
                            <div className="font-bold">T{taskId}</div>
                            <div className="font-mono">
                              {row
                                ? formatTime(
                                    row.completed && row.completion_time
                                      ? row.completion_time
                                      : row.elapsed_time
                                  )
                                : "—"}
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {activeSection === "questions" && (
        <div className="space-y-3">
          {questions.length === 0 ? (
            <p className="text-slate-500 text-sm">No questions yet.</p>
          ) : (
            questions.map((q) => (
              <div
                key={q.id}
                className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm"
              >
                <div className="flex flex-wrap gap-2 text-xs text-slate-500 mb-2">
                  <span className="font-semibold text-slate-800">
                    {q.profile?.full_name || q.profile?.email || "Unknown user"}
                  </span>
                  <span>{q.profile?.email}</span>
                  <span>{new Date(q.created_at).toLocaleString()}</span>
                  {q.task_id && (
                    <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                      Task {q.task_id}: {WORKSHOP_TASK_LABELS[q.task_id]}
                    </span>
                  )}
                </div>
                <p className="text-slate-800 text-sm whitespace-pre-wrap">{q.message}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
