
import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import { Mail, Discord, Telegram, DollarSign, Calendar } from "lucide-react";

type ContactFormValues = {
  purpose: string;
  email: string;
  discord: string;
  telegram: string;
  budget: number;
  timeline: number;
};

const purposes = [
  "Feature Inquiry",
  "Integration",
  "Custom Demo",
  "Partnership",
  "Other",
];

const minBudget = 500;
const maxBudget = 20000;
const minTimeline = 1;
const maxTimeline = 24;

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<ContactFormValues>({
    mode: "onChange",
    defaultValues: {
      purpose: "",
      email: "",
      discord: "",
      telegram: "",
      budget: minBudget,
      timeline: minTimeline,
    },
  });

  // Replace with your real Formspree endpoint action
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORMSPREE_ENDPOINT";

  async function onSubmit(data: ContactFormValues) {
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast("Inquiry sent!", {
          description: "We received your message. Someone will reach out soon.",
        });
        reset();
      } else {
        toast("Something went wrong.", {
          description: "Try again or contact support directly.",
          variant: "destructive",
        });
      }
    } catch (e) {
      toast("Failed to submit.", {
        description: "Contact support or try later.",
        variant: "destructive",
      });
    }
  }

  return (
    <form
      className="bg-white/10 backdrop-blur-md rounded-2xl shadow-depth max-w-xl mx-auto p-8 space-y-6 border border-white/10"
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
    >
      <h2 className="text-3xl font-bold mb-2 text-white">Contact & Inquiry</h2>
      <p className="mb-4 text-base text-gray-200">
        Let’s connect. Select your preferred channels and tell us about your inquiry.
      </p>

      {/* Purpose */}
      <div>
        <Label htmlFor="purpose" className="text-gray-100">
          Purpose
        </Label>
        <Controller
          control={control}
          name="purpose"
          rules={{ required: "Select the purpose of contact." }}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger
                className="mt-2 bg-white/80 backdrop-blur rounded-lg border border-gray-400 text-gray-900 focus:ring-2 focus:ring-blue-500"
                id="purpose"
              >
                <SelectValue placeholder="Select purpose..." />
              </SelectTrigger>
              <SelectContent className="bg-background text-gray-100">
                {purposes.map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.purpose && (
          <p className="text-xs text-red-400 mt-1">{errors.purpose.message}</p>
        )}
      </div>

      {/* Channels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="email" className="flex items-center gap-2 text-gray-100">
            <Mail size={18} /> Email
          </Label>
          <Input
            id="email"
            className="mt-2 rounded-lg bg-white text-gray-900"
            placeholder="your@email.com"
            {...register("email", {
              required: "Email required.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email.",
              },
            })}
            autoComplete="email"
            type="email"
          />
          {errors.email && (
            <span className="text-xs text-red-400 mt-1">{errors.email.message}</span>
          )}
        </div>
        <div>
          <Label htmlFor="discord" className="flex items-center gap-2 text-gray-100">
            <Discord size={18} /> Discord
          </Label>
          <Input
            id="discord"
            className="mt-2 rounded-lg bg-white text-gray-900"
            placeholder="username#0000"
            {...register("discord", {
              pattern: {
                value: /^.{3,32}#[0-9]{4}$/,
                message: "Format: username#0000",
              },
            })}
          />
          {errors.discord && (
            <span className="text-xs text-red-400 mt-1">{errors.discord.message}</span>
          )}
        </div>
        <div>
          <Label htmlFor="telegram" className="flex items-center gap-2 text-gray-100">
            <Telegram size={18} /> Telegram
          </Label>
          <Input
            id="telegram"
            className="mt-2 rounded-lg bg-white text-gray-900"
            placeholder="@telegram"
            {...register("telegram", {
              pattern: {
                value: /^@?(\w){5,32}$/,
                message: "Start with @. 5-32 chars.",
              },
            })}
          />
          {errors.telegram && (
            <span className="text-xs text-red-400 mt-1">{errors.telegram.message}</span>
          )}
        </div>
      </div>

      {/* Budget */}
      <div>
        <Label htmlFor="budget" className="flex items-center gap-2 text-gray-100">
          <DollarSign size={18} /> Budget (USD)
        </Label>
        <Controller
          control={control}
          name="budget"
          render={({ field }) => (
            <div className="flex flex-col mt-2">
              <Slider
                min={minBudget}
                max={maxBudget}
                step={100}
                value={[field.value]}
                onValueChange={([v]) => field.onChange(v)}
                className="w-full"
              />
              <span className="text-blue-400 mt-1 font-semibold">
                ${field.value}
              </span>
            </div>
          )}
        />
      </div>

      {/* Timeline */}
      <div>
        <Label htmlFor="timeline" className="flex items-center gap-2 text-gray-100">
          <Calendar size={18} /> Timeline (months)
        </Label>
        <Controller
          control={control}
          name="timeline"
          render={({ field }) => (
            <div className="flex flex-col mt-2">
              <Slider
                min={minTimeline}
                max={maxTimeline}
                step={1}
                value={[field.value]}
                onValueChange={([v]) => field.onChange(v)}
                className="w-full"
              />
              <span className="text-blue-400 mt-1 font-semibold">
                {field.value} month{field.value !== 1 ? "s" : ""}
              </span>
            </div>
          )}
        />
      </div>

      {/* Submit */}
      <Button
        type="submit"
        className="w-full mt-2 rounded-xl bg-blue-500 text-white text-lg font-bold py-2 hover:bg-blue-600 transition disabled:opacity-60"
        disabled={isSubmitting || !isValid}
      >
        {isSubmitting ? "Sending..." : "Send Inquiry"}
      </Button>
      <p className="text-xs text-gray-400 mt-2 text-center">
        We respect your privacy. Your inquiry will be handled confidentially.
      </p>
    </form>
  );
}
