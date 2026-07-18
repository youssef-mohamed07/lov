import type { ReactNode } from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { IconBox } from "@/components/ui/icon-box";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";

type FeatureCardProps = {
  icon?: ReactNode;
  title: string;
  description: string;
  className?: string;
};

export function FeatureCard({
  icon,
  title,
  description,
  className,
}: FeatureCardProps) {
  return (
    <Card
      className={cn(
        "h-full transition-[border-color,background-color] duration-200 hover:border-accent/35 hover:bg-accent-soft/20",
        className,
      )}
    >
      <CardHeader>
        {icon ? <IconBox>{icon}</IconBox> : null}
        <Heading as="h3" level={4}>
          {title}
        </Heading>
      </CardHeader>
      <CardContent>
        <Text tone="muted">{description}</Text>
      </CardContent>
    </Card>
  );
}
