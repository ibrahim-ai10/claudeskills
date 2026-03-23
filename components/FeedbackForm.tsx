"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";

type FeedbackType = "feedback" | "bug" | "feature";

interface FormData {
  name: string;
  email: string;
  type: FeedbackType;
  message: string;
  subscribe: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const FEEDBACK_TYPES: { value: FeedbackType; label: string }[] = [
  { value: "feedback", label: "Feedback" },
  { value: "bug", label: "Bug Report" },
  { value: "feature", label: "Feature Request" },
];

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = "Name is required.";
  if (!data.email.trim()) {
    errors.email = "Email is required.";
  } else if (!validateEmail(data.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!data.message.trim()) {
    errors.message = "Message is required.";
  } else if (data.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters.";
  }
  return errors;
}

const INITIAL: FormData = {
  name: "",
  email: "",
  type: "feedback",
  message: "",
  subscribe: false,
};

export function FeedbackForm() {
  const [form, setForm] = useState<FormData>(INITIAL);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      const entry = {
        ...form,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      };
      try {
        const existing = JSON.parse(
          localStorage.getItem("claudeskills_feedback") ?? "[]"
        );
        localStorage.setItem(
          "claudeskills_feedback",
          JSON.stringify([...existing, entry])
        );
      } catch {
        // localStorage unavailable
      }
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-12 gap-4">
        <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center">
          <svg
            className="w-7 h-7 text-green-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-zinc-100">
          Thanks for reaching out!
        </h2>
        <p className="text-zinc-400 text-sm max-w-sm">
          Your message has been received. We&apos;ll get back to you soon.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="mt-2"
          onClick={() => {
            setForm(INITIAL);
            setErrors({});
            setSubmitted(false);
          }}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField
          label="Name"
          name="name"
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
          error={errors.name}
          required
        />
        <FormField
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-zinc-300">
          Type <span className="text-red-400">*</span>
        </label>
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3.5 py-2.5 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
        >
          {FEEDBACK_TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      <FormField
        as="textarea"
        label="Message"
        name="message"
        placeholder="Tell us what's on your mind... (min 10 characters)"
        value={form.message}
        onChange={handleChange}
        error={errors.message}
        rows={5}
        required
      />

      <label className="flex items-start gap-3 cursor-pointer group">
        <input
          type="checkbox"
          name="subscribe"
          checked={form.subscribe}
          onChange={handleChange}
          className="mt-0.5 w-4 h-4 rounded border-zinc-600 bg-zinc-900 text-blue-600 focus:ring-blue-500 focus:ring-offset-zinc-950 cursor-pointer"
        />
        <span className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">
          Subscribe to product updates and announcements
        </span>
      </label>

      <Button type="submit" loading={submitting} size="lg" className="mt-1">
        {submitting ? "Sending…" : "Send Message"}
      </Button>
    </form>
  );
}
