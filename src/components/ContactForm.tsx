
import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Mail, Send, ArrowRight } from "lucide-react";

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000)
});

type FormValues = z.infer<typeof formSchema>;

const ContactForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const controls = useAnimation();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });
  
  // Intersection Observer for scroll reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
        controls.start("visible");
      }
    }, { threshold: 0.1 });
    
    const element = document.getElementById("contact");
    if (element) observer.observe(element);
    
    return () => {
      if (element) observer.unobserve(element);
    };
  }, [controls]);
  
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Simulated form submission
      await new Promise(r => setTimeout(r, 1000));
      
      toast.success("Message sent successfully!", {
        description: "We'll get back to you soon.",
        position: "bottom-right",
      });
      form.reset();
    } catch (error) {
      toast.error("Failed to send message", {
        description: "Please try again later.",
        position: "bottom-right",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section className="py-24 px-4 relative overflow-hidden" id="contact">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/40 via-navy-900/60 to-navy-900/90 backdrop-blur-sm z-0" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 neo-text-gradient">
              Let's Connect
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Have a project in mind or want to discuss potential opportunities?
              I'm always open to new ideas and collaborations.
            </p>
          </motion.div>
          
          <motion.div 
            variants={itemVariants} 
            className="rounded-2xl overflow-hidden backdrop-blur-md bg-white/5 border border-white/10 shadow-lg p-6 md:p-10"
          >
            <div className="flex flex-col md:flex-row gap-10">
              {/* Contact info with decorative elements */}
              <div className="md:w-1/3">
                <div className="border-l-2 border-emerald-500 pl-4 mb-8">
                  <h3 className="text-xl font-semibold text-white mb-1">Contact Details</h3>
                  <p className="text-white/60">Reach out directly</p>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <Mail size={18} className="text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-sm text-white/60">Email</p>
                      <p className="text-white font-medium">hello@example.com</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-white/70 text-sm italic">
                    "I'm currently available for freelance projects and full-time opportunities."
                  </p>
                </div>
                
                {/* Decorative glowing orb */}
                <div className="relative h-40 mt-8 hidden md:block">
                  <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-emerald-500/20 blur-2xl animate-pulse-slow"></div>
                </div>
              </div>
              
              {/* Contact form with enhanced styling */}
              <div className="md:w-2/3">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white/80 text-sm uppercase tracking-wider font-medium">Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Your name" 
                                {...field}
                                className="bg-white/5 border-white/10 text-white focus-visible:ring-emerald-500/50 py-6"
                              />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white/80 text-sm uppercase tracking-wider font-medium">Email</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Your email" 
                                {...field}
                                className="bg-white/5 border-white/10 text-white focus-visible:ring-emerald-500/50 py-6"
                              />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white/80 text-sm uppercase tracking-wider font-medium">Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell me about your project..." 
                              {...field}
                              className="bg-white/5 border-white/10 text-white focus-visible:ring-emerald-500/50 min-h-[160px] resize-none"
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                    <div className="pt-4">
                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-6 h-auto group"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                            <span>Sending...</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span>Send Message</span>
                            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                          </div>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;
