"use client";

import { ArrowRight, Calendar, Mail, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { CONTACT_INFO } from "../../../../shared/constants";

export default function ContactMethods() {

const CONTACT_METHODS = [
{
icon: Mail,
title: "Email",
value: CONTACT_INFO.email,
href: `mailto:${CONTACT_INFO.email}`,
color: "bg-primary",
},
{
icon: Calendar,
title: "Book a Call",
value: "30-min consultation",
href: `tel:${CONTACT_INFO.phone}`,
color: "bg-secondary text-foreground",
},
{
icon: MessageSquare,
title: "LinkedIn",
value: "Message me",
href: "https://www.linkedin.com/in/aryan-antal-74310920b",
color: "bg-accent",
},
];

return (
<section className="py-16 bg-foreground text-background">
    <div className="container mx-auto px-4">
    <div className="grid md:grid-cols-3 gap-6">
        {CONTACT_METHODS.map((item, i) => {
        const Icon = item.icon;

        return (
            <motion.a
            key={item.title}
            href={item.href}
            className={`${item.color} p-8 group`}
            >
            <Icon className="w-8 h-8 mb-6" />
            <div className="text-sm uppercase mb-2">{item.title}</div>
            <div className="text-2xl font-black mb-4">{item.value}</div>
            <div className="flex items-center gap-2">
                CONNECT <ArrowRight />
            </div>
            </motion.a>
        );
        })}
    </div>
    </div>
</section>
);
}