import { type Metadata } from "next";

import { NavigationLink } from "@/components/navigation-link";
import { Button } from "@/components/ui/button";
import { PageHeading } from "@/components/ui/page-heading";

export const metadata: Metadata = {
  title: "Organize Life Together",
  description: "Plan events, manage tasks, and track expenses with Eventeer — collaboration made easy."
};

const HomePage = () => (
  <div className="flex flex-grow flex-col items-center">
    <section className="mt-4 flex max-w-4xl flex-col items-center px-8 text-center">
      <PageHeading>
        Organize Life Together with <span className="text-primary">Eventeer</span>
      </PageHeading>

      <p className="text-muted-foreground animate-fade-in-slow mb-8 text-lg delay-200 md:text-xl">
        Plan events, track tasks, manage expenses — all in shared rooms built for collaboration.
      </p>
      <div className="animate-fade-in-slow flex gap-4 delay-400">
        <Button asChild>
          <NavigationLink href="/rooms">Get Started</NavigationLink>
        </Button>
        <Button asChild variant="secondary">
          <NavigationLink href="#features">Learn More</NavigationLink>
        </Button>
      </div>
    </section>

    <section id="features" className="mt-16 w-full max-w-6xl px-6">
      <h2 className="animate-fade-in-slow mb-16 text-center text-4xl font-bold">✨ Features</h2>
      <div className="grid gap-10 md:grid-cols-2">
        {features.map((feature, index) => (
          <FeatureComponent key={feature.title} feature={feature} index={index} />
        ))}
      </div>
    </section>

    <section className="mt-16 px-6 text-center">
      <h2 className="animate-fade-in-slow mb-6 text-3xl font-semibold md:text-4xl">Ready to create your first room?</h2>
      <p className="text-muted-foreground animate-fade-in-slow mb-8 text-lg delay-200">
        Join Eventeer today and make group organization effortless.
      </p>
      <Button asChild>
        <NavigationLink href="/rooms">Create Your Room</NavigationLink>
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
    className="card animate-fade-in-slow transform transition-transform hover:-translate-y-2 hover:shadow-lg"
    style={{ animationDelay: `calc(500ms + ${index * 200}ms)` }}
    aria-labelledby={`feature-title-${index}`}
    aria-describedby={`feature-desc-${index}`}
  >
    <h3 className="mb-3 text-2xl font-semibold">{feature.title}</h3>
    <p className="text-muted-foreground text-base">{feature.description}</p>
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
