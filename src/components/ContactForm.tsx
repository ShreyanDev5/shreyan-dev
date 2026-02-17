import React, { useState, memo } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";
import { Send, Check } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000),
});

type FormValues = z.infer<typeof formSchema>;

const ContactForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("https://formspree.io/f/xnnbeopz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        form.reset();
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 sm:py-32 px-4 relative" id="contact">
      {/* Subtle emerald warmth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, rgba(16, 185, 129, 0.03), transparent 60%)`,
        }}
      />
      <div className="max-w-xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
            Get in Touch
          </h2>
          <div className="w-12 h-0.5 bg-emerald-500 rounded-full mx-auto mb-6" />
          <p className="text-gray-400 text-base sm:text-lg font-light">
            Have a vision or idea? Let's make it real.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="rounded-2xl border border-white/10 p-6 sm:p-8"
        >
          {isSubmitted ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center py-12 gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <Check className="text-emerald-500" size={24} />
              </div>
              <p className="text-white font-medium">Message sent!</p>
              <p className="text-gray-400 text-sm">I'll respond within 24 hours.</p>
            </motion.div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300 text-sm">Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your name"
                          {...field}
                          className="bg-white/5 border-white/10 focus:border-emerald-500/50 text-white h-11 rounded-lg text-sm"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400 text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300 text-sm">Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="email@example.com"
                          {...field}
                          className="bg-white/5 border-white/10 focus:border-emerald-500/50 text-white h-11 rounded-lg text-sm"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400 text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300 text-sm">Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="How can I help you?"
                          {...field}
                          className="bg-white/5 border-white/10 focus:border-emerald-500/50 text-white min-h-[120px] rounded-lg resize-none text-sm"
                          rows={4}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400 text-xs" />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white h-11 text-sm font-medium transition-colors"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin">⚡</span> Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Send Message <Send size={14} />
                    </span>
                  )}
                </Button>
              </form>
            </Form>
          )}

          <p className="text-center text-gray-500 text-xs mt-6">
            Or email me directly at{" "}
            <a href="mailto:shreyandev5@gmail.com" className="text-emerald-500 hover:underline">
              shreyandev5@gmail.com
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(ContactForm);
