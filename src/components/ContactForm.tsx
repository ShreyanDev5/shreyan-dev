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
import { Send, Github, Linkedin } from "lucide-react";

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
    <section className="py-12 sm:py-20 px-4 relative overflow-hidden" id="contact">
      {/* Subtle circuit pattern overlay with reduced opacity */}
      <div className="absolute inset-0 bg-circuit-pattern opacity-5 z-0" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6 tracking-tight bg-gradient-to-r from-emerald-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent drop-shadow-md">
            Let's Create the Future
          </h2>
          <div className="text-gray-300 max-w-2xl mx-auto px-2">
            <p className="text-lg sm:text-xl leading-relaxed font-light">
              Have a vision or idea you're passionate about? Let's make it real — <span className="italic font-medium">together</span>.
            </p>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#141417] via-[#16161a] to-[#1a1a1f] p-4 sm:p-8 shadow-2xl border border-white/5 transform-gpu backdrop-blur-sm hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] transition-all duration-500"
        >
          <div className="flex flex-col gap-6 sm:gap-8">
            {/* Contact form */}
            <div className="w-full">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 sm:space-y-7">
                  {/* Name field */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="name" className="text-gray-200 text-sm sm:text-base font-medium">Full Name</FormLabel>
                        <FormControl>
                          <Input 
                            id="name"
                            placeholder="Your Name" 
                            {...field}
                            className="bg-[#1a1a1f]/60 border-white/10 focus:border-emerald-500/50 text-white h-11 sm:h-12 rounded-lg transition-all duration-200 hover:bg-[#1a1a1f]/80 text-sm sm:text-base"
                            aria-describedby="name-error"
                            tabIndex={1}
                          />
                        </FormControl>
                        <FormMessage id="name-error" className="text-red-400 text-xs sm:text-sm" />
                      </FormItem>
                    )}
                  />
                  
                  {/* Email field */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="email" className="text-gray-200 text-sm sm:text-base font-medium">Email Address</FormLabel>
                        <FormControl>
                          <Input 
                            id="email"
                            placeholder="email@example.com" 
                            {...field}
                            className="bg-[#1a1a1f]/60 border-white/10 focus:border-emerald-500/50 text-white h-11 sm:h-12 rounded-lg transition-all duration-200 hover:bg-[#1a1a1f]/80 text-sm sm:text-base"
                            aria-describedby="email-error"
                            tabIndex={2}
                          />
                        </FormControl>
                        <FormMessage id="email-error" className="text-red-400 text-xs sm:text-sm" />
                      </FormItem>
                    )}
                  />
                  
                  {/* Message field */}
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="message" className="text-gray-200 text-sm sm:text-base font-medium">Your Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            id="message"
                            placeholder="How can I help you?" 
                            {...field}
                            className="bg-[#1a1a1f]/60 border-white/10 focus:border-emerald-500/50 text-white min-h-[120px] sm:min-h-[140px] rounded-lg transition-all duration-200 resize-none hover:bg-[#1a1a1f]/80 text-sm sm:text-base"
                            aria-describedby="message-error"
                            tabIndex={3}
                            rows={4}
                          />
                        </FormControl>
                        <FormMessage id="message-error" className="text-red-400 text-xs sm:text-sm" />
                      </FormItem>
                    )}
                  />
                  
                  {/* Enhanced submit button */}
                  <div className="flex justify-end">
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      size="lg"
                      className="w-full sm:w-auto rounded-lg bg-[#059669] hover:bg-[#059669] text-white px-6 sm:px-8 py-3 sm:py-3.5 h-auto text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 group"
                      tabIndex={4}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="animate-spin">⚡</span>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          Send Message
                          <Send size={16} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110" aria-hidden="true" />
                        </span>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>

              {/* Enhanced Social Links Section */}
              <div className="mt-8 sm:mt-12 pt-6 sm:pt-8">
                <div className="relative flex items-center justify-center mb-6 sm:mb-8">
                  <div className="flex-grow h-px bg-white/10"></div>
                  <span className="mx-4 text-gray-400 text-xs sm:text-sm font-medium">Connect with me</span>
                  <div className="flex-grow h-px bg-white/10"></div>
                </div>
                
                <div className="flex justify-center items-center gap-4 sm:gap-6">
                  <a 
                    href="https://linkedin.com/in/your-profile" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group relative p-3 sm:p-4 rounded-xl bg-gradient-to-br from-[#0A66C2]/20 to-[#0A66C2]/10 hover:from-[#0A66C2]/30 hover:to-[#0A66C2]/20 transition-all duration-500 border border-[#0A66C2]/30 hover:border-[#0A66C2]/40 hover:shadow-[0_0_25px_rgba(10,102,194,0.2)]"
                    aria-label="LinkedIn Profile"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0A66C2]/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <Linkedin 
                      size={20} 
                      className="relative text-[#0A66C2] brightness-110 group-hover:scale-110 transition-transform duration-300 sm:w-6 sm:h-6" 
                      strokeWidth={2}
                    />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                  
                  <a 
                    href="https://github.com/your-username" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group relative p-3 sm:p-4 rounded-xl bg-gradient-to-br from-white/10 to-white/5 hover:from-white/20 hover:to-white/15 transition-all duration-500 border border-white/20 hover:border-white/30 hover:shadow-[0_0_25px_rgba(255,255,255,0.1)]"
                    aria-label="GitHub Profile"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <Github 
                      size={20} 
                      className="relative text-white group-hover:scale-110 transition-transform duration-300 sm:w-6 sm:h-6" 
                      strokeWidth={2}
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
