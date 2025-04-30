import { type Metadata } from "next";

import { NavigationLink } from "@/components/navigation-link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Organize Life Together",
  description: "Plan events, manage tasks, and track expenses with Eventeer — collaboration made easy."
};

const HomePage = () => (
  <div className="flex-grow flex flex-col items-center">
    <section className="flex flex-col items-center text-center px-8 mt-4 max-w-4xl">
      <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 animate-fade-in-slow">
        Organize Life Together with <span className="text-primary">Eventeer</span>
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in-slow delay-200">
        Plan events, track tasks, manage expenses — all in shared rooms built for collaboration.
      </p>
      <div className="flex gap-4 animate-fade-in-slow delay-400">
        <Button asChild>
          <NavigationLink href="/register">Get Started</NavigationLink>
        </Button>
        <Button asChild variant="secondary">
          <NavigationLink href="#features">Learn More</NavigationLink>
        </Button>
      </div>
    </section>

    <section id="features" className="mt-16 w-full max-w-6xl px-6">
      <h2 className="text-4xl font-bold mb-16 text-center animate-fade-in-slow">✨ Features</h2>
      <div className="grid gap-10 md:grid-cols-2">
        {features.map((feature, index) => (
          <FeatureComponent key={feature.title} feature={feature} index={index} />
        ))}
      </div>
    </section>

    <section className="mt-16 text-center px-6">
      <h2 className="text-3xl md:text-4xl font-semibold mb-6 animate-fade-in-slow">Ready to create your first room?</h2>
      <p className="text-lg text-muted-foreground mb-8 animate-fade-in-slow delay-200">
        Join Eventeer today and make group organization effortless.
      </p>
      <Button asChild>
        <NavigationLink href="/register">Create Your Room</NavigationLink>
      </Button>
    </section>
  </div>
);

type FeatureComponentProps = {
  feature: Feature;
  index: number;
};

const FeatureComponent = ({ feature, index }: FeatureComponentProps) => (
  <article
    key={feature.title}
    className="card transition-transform transform hover:-translate-y-2 hover:shadow-lg animate-fade-in-slow"
    style={{ animationDelay: `calc(500ms + ${index * 200}ms)` }}
    aria-labelledby={`feature-title-${index}`}
    aria-describedby={`feature-desc-${index}`}
  >
    <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
    <p className="text-base text-muted-foreground">{feature.description}</p>
  </article>
);

type Feature = {
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    title: "🏠 Shared Rooms",
    description:
      "Create and join rooms to collaborate on event planning, task management, and expense tracking — all in one place."
  },
  {
    title: "📅 Event Planning",
    description: "Organize one-time or recurring events, invite participants, and set reminders effortlessly."
  },
  {
    title: "✅ Task Management",
    description:
      "Assign mandatory or optional tasks to events, prioritize responsibilities, and monitor progress easily."
  },
  {
    title: "💰 Expense Tracking",
    description: "Track and split shared expenses transparently among your group to avoid confusion."
  },
  {
    title: "🚦 Priorities & Statuses",
    description: "Highlight important tasks with priority levels and custom status labels to stay on top of everything."
  },
  {
    title: "📈 Built for Groups",
    description: "Ideal for roommates, project teams, and friend groups managing life or work together."
  }
];

export default HomePage;