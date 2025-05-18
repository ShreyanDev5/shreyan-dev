import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Mail, Send, Github, Linkedin } from "lucide-react";

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000)
});

type FormValues = z.infer<typeof formSchema>;

const ContactForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });
  
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Formspree submission
      const response = await fetch("https://formspree.io/f/your-form-id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        toast.success("✅ Message sent! I'll respond within 24 hours.");
        form.reset();
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden bg-darkBlue" id="contact">
      {/* Subtle circuit pattern overlay with reduced opacity */}
      <div className="absolute inset-0 bg-circuit-pattern opacity-5 z-0" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6 flex items-center justify-center gap-4 bg-gradient-to-r from-emerald-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent drop-shadow-md">
            <Mail size={36} className="text-emerald-400" aria-hidden="true" />
            <span className="tracking-tight">Let's Connect</span>
            <span className="sr-only">Contact Section</span>
          </h2>
          <div className="text-gray-300 max-w-2xl mx-auto">
            <p className="text-xl leading-relaxed font-light mb-3">
              Have a project in mind or want to collaborate? I'd love to hear from you!
            </p>
            <p className="text-lg text-emerald-400/90 font-medium">
              Let's create something amazing together ✨
            </p>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-2xl bg-gradient-to-br from-[#1a1a1d] via-[#1d1d20] to-[#222] p-8 shadow-xl border border-white/5 transform-gpu backdrop-blur-sm"
        >
          <div className="flex flex-col gap-8">
            {/* Contact form */}
            <div className="w-full">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
                  {/* Name field */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="name" className="text-gray-200 text-base font-medium">Full Name</FormLabel>
                        <FormControl>
                          <Input 
                            id="name"
                            placeholder="Your Name" 
                            {...field}
                            className="bg-darkBlue/40 border-white/10 focus:border-emerald-500/50 text-white h-12 rounded-lg transition-all duration-200"
                            aria-describedby="name-error"
                            tabIndex={1}
                          />
                        </FormControl>
                        <FormMessage id="name-error" className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  
                  {/* Email field */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="email" className="text-gray-200 text-base font-medium">Email Address</FormLabel>
                        <FormControl>
                          <Input 
                            id="email"
                            placeholder="email@example.com" 
                            {...field}
                            className="bg-darkBlue/40 border-white/10 focus:border-emerald-500/50 text-white h-12 rounded-lg transition-all duration-200"
                            aria-describedby="email-error"
                            tabIndex={2}
                          />
                        </FormControl>
                        <FormMessage id="email-error" className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  
                  {/* Message field */}
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="message" className="text-gray-200 text-base font-medium">Your Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            id="message"
                            placeholder="How can I help you?" 
                            {...field}
                            className="bg-darkBlue/40 border-white/10 focus:border-emerald-500/50 text-white min-h-[140px] rounded-lg transition-all duration-200 resize-none"
                            aria-describedby="message-error"
                            tabIndex={3}
                            rows={5}
                          />
                        </FormControl>
                        <FormMessage id="message-error" className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  
                  {/* Enhanced submit button - right aligned */}
                  <div className="flex justify-end">
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      variant="contact"
                      size="lg"
                      className="rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 h-auto text-sm font-medium transition-all duration-300 hover:shadow-md hover:shadow-emerald-500/30 hover:-translate-y-0.5"
                      tabIndex={4}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="animate-spin">⚡</span>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Send Message
                          <Send size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                        </span>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>

              {/* Social Links */}
              <div className="mt-12 pt-8 border-t border-white/10">
                <p className="text-center text-gray-300 mb-6 text-lg">Connect with me on social media</p>
                <div className="flex justify-center items-center gap-8">
                  <a 
                    href="https://linkedin.com/in/your-profile" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group p-3.5 rounded-full bg-[#0A66C2]/15 hover:bg-[#0A66C2]/25 transition-all duration-300 hover:scale-110 border border-[#0A66C2]/30 hover:border-[#0A66C2]/40 hover:shadow-[0_0_20px_rgba(10,102,194,0.4)]"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin 
                      size={24} 
                      className="text-[#0A66C2] group-hover:scale-110 transition-transform duration-300" 
                      strokeWidth={2.5}
                    />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                  <a 
                    href="https://github.com/your-username" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group p-3.5 rounded-full bg-white/10 hover:bg-white/15 transition-all duration-300 hover:scale-110 border border-white/20 hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                    aria-label="GitHub Profile"
                  >
                    <Github 
                      size={24} 
                      className="text-white group-hover:scale-110 transition-transform duration-300" 
                      strokeWidth={2.5}
                    />
                    <span className="sr-only">GitHub</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;
