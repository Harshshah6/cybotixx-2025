import { LandingPageConstants } from "@/lib/constants";
import React from "react";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";
import { getCybotixxStats } from "@/actions/utils";
import { Calendar, LucideProps, Trophy, User } from "lucide-react";

export default async function CybotixxStats() {
  const data = await getCybotixxStats();
  return (
    <>
      <StatItem label="Active Members" Icon={User} color="text-blue-600" value={`${data.totalUsers}+`} />
      <StatItem label="Events Hosted" Icon={Calendar} color="text-purple-600" value={`${data.totalEvents}+`} />
      <StatItem label="Competitions Won" Icon={Trophy} color="text-green-600" value={`${data.totalParticipants}+`} />
    </>
  );
}

function StatItem({
  Icon,
  label,
  color,
  value,
}: {
  label: string;
  color: string;
  value: string;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}) {
  return (
    <>
      <div
        className={cn(
          "bg-card border duration-300 rounded-xl p-6 shadow-sm text-center"
        )}
      >
        <Icon className={`size-8 ${color} mx-auto mb-3`} />
        <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
          {value}
        </div>
        <div className="text-sm text-muted-foreground">{label}</div>
      </div>
    </>
  );
}

export function CybotixxStatsSkeleton() {
  return (
    <>
      {LandingPageConstants.cybotixxStats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className={cn(
              "bg-card border duration-300 rounded-xl p-6 shadow-sm text-center"
            )}
          >
            <Icon className={`size-8 ${stat.color} mx-auto mb-3`} />
            <Skeleton className="text-2xl md:text-3xl font-bold text-transparent mb-1">
              {stat.value}
            </Skeleton>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        );
      })}
    </>
  );
}
