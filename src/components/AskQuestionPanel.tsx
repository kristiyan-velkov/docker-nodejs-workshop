import { useEffect, useState, type FormEvent } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getSupabase } from "../lib/supabase";
import {
  WORKSHOP_TASK_COUNT,
  WORKSHOP_TASK_LABELS,
} from "../constants/workshopTasksMeta";
import type { WorkshopQuestion } from "../types/database";

export const AskQuestionPanel = () => {
  const { user } = useAuth();
  const [taskId, setTaskId] = useState<string>("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [myQuestions, setMyQuestions] = useState<WorkshopQuestion[]>([]);
  const [loading, setLoading] = useState(true);

  const loadQuestions = async () => {
    const supabase = getSupabase();
    if (!supabase || !user) return;

    setLoading(true);
    const { data, error: fetchError } = await supabase
      .from("workshop_questions")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (fetchError) {
      console.error(fetchError.message);
    } else {
      setMyQuestions(data ?? []);
    }
    setLoading(false);
  };

  useEffect(() => {
    void loadQuestions();
  }, [user?.id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const supabase = getSupabase();
    if (!supabase || !user) return;

    setSubmitting(true);
    setError(null);
    setSuccess(false);

    const { error: insertError } = await supabase
      .from("workshop_questions")
      .insert({
        user_id: user.id,
        task_id: taskId ? Number(taskId) : null,
        message: message.trim(),
      });

    setSubmitting(false);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    setMessage("");
    setTaskId("");
    setSuccess(true);
    void loadQuestions();
  };

  return (
    <div className="space-y-8">
      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-xl">
        <h3 className="text-xl font-bold text-slate-800 mb-2">💬 Ask a question</h3>
        <p className="text-slate-600 text-sm">
          Stuck on a task? Send a question to the workshop instructor. Admins see
          all questions in the Admin panel.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div>
          <label htmlFor="question-task" className="block text-sm font-medium text-slate-700 mb-1">
            Related task (optional)
          </label>
          <select
            id="question-task"
            value={taskId}
            onChange={(e) => setTaskId(e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-xl bg-white"
          >
            <option value="">General / not task-specific</option>
            {Array.from({ length: WORKSHOP_TASK_COUNT }, (_, i) => i + 1).map(
              (id) => (
                <option key={id} value={id}>
                  Task {id}: {WORKSHOP_TASK_LABELS[id]}
                </option>
              )
            )}
          </select>
        </div>

        <div>
          <label htmlFor="question-message" className="block text-sm font-medium text-slate-700 mb-1">
            Your question
          </label>
          <textarea
            id="question-message"
            required
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-y"
            placeholder="Describe what you're stuck on…"
          />
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
        )}
        {success && (
          <p className="text-sm text-emerald-700 bg-green-50 px-3 py-2 rounded-lg">
            Question sent. An admin will review it in the Admin panel.
          </p>
        )}

        <button
          type="submit"
          disabled={submitting || !message.trim()}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-60"
        >
          {submitting ? "Sending…" : "Send question"}
        </button>
      </form>

      <div>
        <h4 className="text-lg font-bold text-slate-800 mb-4">Your previous questions</h4>
        {loading ? (
          <p className="text-slate-500 text-sm">Loading…</p>
        ) : myQuestions.length === 0 ? (
          <p className="text-slate-500 text-sm">No questions yet.</p>
        ) : (
          <ul className="space-y-3">
            {myQuestions.map((q) => (
              <li
                key={q.id}
                className="bg-slate-50 border border-slate-200 rounded-xl p-4"
              >
                <div className="flex flex-wrap gap-2 text-xs text-slate-500 mb-2">
                  <span>{new Date(q.created_at).toLocaleString()}</span>
                  {q.task_id && (
                    <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                      Task {q.task_id}
                    </span>
                  )}
                </div>
                <p className="text-slate-800 text-sm whitespace-pre-wrap">{q.message}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
