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
    <section className="py-12 sm:py-16 px-4 relative overflow-hidden" id="contact">
      {/* Subtle circuit pattern overlay with reduced opacity - optimized for mobile */}
      <div className="absolute inset-0 bg-circuit-pattern opacity-3 sm:opacity-5 z-0" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 sm:mb-12"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold mb-3 sm:mb-6 tracking-tight heading-gradient-neutral drop-shadow-md" style={{ lineHeight: '1.2' }}>
            Let's Create the Future
          </h2>
          <div className="text-gray-300 max-w-2xl mx-auto px-2">
            <p className="text-lg sm:text-xl md:text-2xl font-light" style={{ lineHeight: '1.6' }}>
              Have a vision or idea you're passionate about? Let's make it real — <span className="italic font-medium">together</span>.
            </p>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-lg sm:rounded-2xl bg-gradient-to-br from-[#141417] via-[#16161a] to-[#1a1a1f] p-4 sm:p-6 md:p-8 shadow-2xl border border-white/5 transform-gpu backdrop-blur-sm hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] transition-all duration-500"
        >
          <div className="flex flex-col gap-5 sm:gap-6 md:gap-8">
            {/* Contact form */}
            <div className="w-full">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5 md:space-y-7">
                  {/* Name field - optimized for mobile */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="name" className="text-gray-200 text-sm sm:text-base font-medium" style={{ lineHeight: '1.5' }}>Full Name</FormLabel>
                        <FormControl>
                          <Input 
                            id="name"
                            placeholder="Your Name" 
                            {...field}
                            className="bg-[#1a1a1f]/60 border-white/10 focus:border-emerald-500/50 text-white h-10 sm:h-11 md:h-12 rounded-lg transition-all duration-200 hover:bg-[#1a1a1f]/80 text-sm sm:text-base"
                            aria-describedby="name-error"
                            tabIndex={1}
                          />
                        </FormControl>
                        <FormMessage id="name-error" className="text-red-400 text-xs sm:text-sm" />
                      </FormItem>
                    )}
                  />
                  
                  {/* Email field - optimized for mobile */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="email" className="text-gray-200 text-sm sm:text-base font-medium" style={{ lineHeight: '1.5' }}>Email Address</FormLabel>
                        <FormControl>
                          <Input 
                            id="email"
                            placeholder="email@example.com" 
                            {...field}
                            className="bg-[#1a1a1f]/60 border-white/10 focus:border-emerald-500/50 text-white h-10 sm:h-11 md:h-12 rounded-lg transition-all duration-200 hover:bg-[#1a1a1f]/80 text-sm sm:text-base"
                            aria-describedby="email-error"
                            tabIndex={2}
                          />
                        </FormControl>
                        <FormMessage id="email-error" className="text-red-400 text-xs sm:text-sm" />
                      </FormItem>
                    )}
                  />
                  
                  {/* Message field - optimized for mobile */}
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="message" className="text-gray-200 text-sm sm:text-base font-medium" style={{ lineHeight: '1.5' }}>Your Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            id="message"
                            placeholder="How can I help you?" 
                            {...field}
                            className="bg-[#1a1a1f]/60 border-white/10 focus:border-emerald-500/50 text-white min-h-[100px] sm:min-h-[120px] md:min-h-[140px] rounded-lg transition-all duration-200 resize-none hover:bg-[#1a1a1f]/80 text-sm sm:text-base"
                            aria-describedby="message-error"
                            tabIndex={3}
                            rows={4}
                          />
                        </FormControl>
                        <FormMessage id="message-error" className="text-red-400 text-xs sm:text-sm" />
                      </FormItem>
                    )}
                  />
                  
                  {/* Enhanced submit button - optimized for mobile */}
                  <div className="flex justify-end">
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      size="lg"
                      className="w-full sm:w-auto rounded-lg bg-[#059669] hover:bg-[#059669] text-white px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-3.5 h-auto text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 group"
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
                          <Send size={14} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110" aria-hidden="true" />
                        </span>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>

              {/* Enhanced Social Links Section - optimized for mobile */}
              <div className="mt-6 sm:mt-8 md:mt-12 pt-5 sm:pt-6 md:pt-8">
                <div className="relative flex items-center justify-center mb-5 sm:mb-6 md:mb-8">
                  <div className="flex-grow h-px bg-white/10"></div>
                  <span className="mx-3 sm:mx-4 text-gray-400 text-xs sm:text-sm font-medium">Connect with me</span>
                  <div className="flex-grow h-px bg-white/10"></div>
                </div>
                
                <div className="flex justify-center items-center gap-3 sm:gap-4 md:gap-6">
                  <a 
                    href="https://linkedin.com/in/your-profile" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group relative p-2.5 sm:p-3 md:p-4 rounded-xl bg-gradient-to-br from-[#0A66C2]/15 to-[#0A66C2]/8 hover:from-[#0A66C2]/25 hover:to-[#0A66C2]/15 transition-all duration-500 border border-[#0A66C2]/20 hover:border-[#0A66C2]/30 hover:shadow-[0_0_20px_rgba(10,102,194,0.15)]"
                    aria-label="LinkedIn Profile"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0A66C2]/8 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <Linkedin 
                      size={18} 
                      className="relative text-[#0A66C2] brightness-110 group-hover:scale-110 transition-transform duration-300 sm:w-5 sm:h-5 md:w-6 md:h-6" 
                      strokeWidth={2}
                    />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                  
                  <a 
                    href="https://github.com/your-username" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group relative p-2.5 sm:p-3 md:p-4 rounded-xl bg-gradient-to-br from-white/8 to-white/4 hover:from-white/15 hover:to-white/10 transition-all duration-500 border border-white/15 hover:border-white/25 hover:shadow-[0_0_20px_rgba(255,255,255,0.08)]"
                    aria-label="GitHub Profile"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/4 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <Github 
                      size={18} 
                      className="relative text-white group-hover:scale-110 transition-transform duration-300 sm:w-5 sm:h-5 md:w-6 md:h-6" 
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
