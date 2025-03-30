import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  AlertCircle,
  Calendar as CalendarIcon,
  CheckCircle2,
} from "lucide-react";

interface ComplianceEvent {
  id: string;
  title: string;
  date: Date;
  type: "deadline" | "reminder" | "completed";
  description?: string;
}

interface ComplianceCalendarProps {
  events?: ComplianceEvent[];
  onDateSelect?: (date: Date) => void;
  onEventClick?: (event: ComplianceEvent) => void;
}

const ComplianceCalendar = ({
  events = [
    {
      id: "1",
      title: "Annual Privacy Policy Review",
      date: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() + 5,
      ),
      type: "deadline",
      description:
        "Complete the annual review of privacy policies and update as needed.",
    },
    {
      id: "2",
      title: "Data Security Compliance",
      date: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() + 2,
      ),
      type: "reminder",
      description: "Reminder to check data security compliance requirements.",
    },
    {
      id: "3",
      title: "Employee Code of Conduct",
      date: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() - 3,
      ),
      type: "completed",
      description: "Employee code of conduct acknowledgment deadline.",
    },
    {
      id: "4",
      title: "Quarterly Compliance Report",
      date: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() + 10,
      ),
      type: "deadline",
      description:
        "Submit quarterly compliance report to regulatory authorities.",
    },
    {
      id: "5",
      title: "Security Training Reminder",
      date: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() + 1,
      ),
      type: "reminder",
      description:
        "Reminder for all employees to complete security awareness training.",
    },
  ],
  onDateSelect = () => {},
  onEventClick = () => {},
}: ComplianceCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [selectedEvents, setSelectedEvents] = useState<ComplianceEvent[]>([]);

  // Function to handle date selection
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      onDateSelect(date);

      // Filter events for the selected date
      const filteredEvents = events.filter(
        (event) =>
          event.date.getDate() === date.getDate() &&
          event.date.getMonth() === date.getMonth() &&
          event.date.getFullYear() === date.getFullYear(),
      );

      setSelectedEvents(filteredEvents);
    }
  };

  // Function to handle event click
  const handleEventClick = (event: ComplianceEvent) => {
    onEventClick(event);
  };

  // Function to get events for a specific date
  const getEventsForDate = (date: Date) => {
    return events.filter(
      (event) =>
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear(),
    );
  };

  // Custom day renderer for the calendar
  const renderDay = (day: Date, modifiers: any) => {
    const dayEvents = getEventsForDate(day);
    const hasDeadline = dayEvents.some((event) => event.type === "deadline");
    const hasReminder = dayEvents.some((event) => event.type === "reminder");
    const hasCompleted = dayEvents.some((event) => event.type === "completed");

    return (
      <div className="relative w-full h-full">
        <div
          className={cn(
            "h-8 w-8 p-0 font-normal",
            modifiers.selected ? "bg-primary text-primary-foreground" : "",
            modifiers.today ? "bg-accent text-accent-foreground" : "",
          )}
        >
          {day.getDate()}
        </div>
        {dayEvents.length > 0 && (
          <div className="absolute -bottom-1 left-0 right-0 flex justify-center space-x-0.5">
            {hasDeadline && (
              <div className="h-1 w-1 rounded-full bg-destructive" />
            )}
            {hasReminder && <div className="h-1 w-1 rounded-full bg-warning" />}
            {hasCompleted && (
              <div className="h-1 w-1 rounded-full bg-success" />
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="w-full h-full bg-background border-border">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-foreground">
          Compliance Calendar
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Track upcoming compliance deadlines and reminders
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
          <div className="md:col-span-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              className="rounded-md border bg-card"
              components={{
                Day: ({ date, ...props }) => {
                  const dayEvents = getEventsForDate(date);
                  return (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            {...props}
                            className={cn(
                              props.className,
                              dayEvents.length > 0 && "font-bold",
                            )}
                          >
                            <time dateTime={date.toDateString()}>
                              {date.getDate()}
                            </time>
                            {dayEvents.length > 0 && (
                              <div className="absolute bottom-1 left-0 right-0 flex justify-center space-x-0.5">
                                {dayEvents.some(
                                  (e) => e.type === "deadline",
                                ) && (
                                  <div className="h-1 w-1 rounded-full bg-destructive" />
                                )}
                                {dayEvents.some(
                                  (e) => e.type === "reminder",
                                ) && (
                                  <div className="h-1 w-1 rounded-full bg-amber-500" />
                                )}
                                {dayEvents.some(
                                  (e) => e.type === "completed",
                                ) && (
                                  <div className="h-1 w-1 rounded-full bg-green-500" />
                                )}
                              </div>
                            )}
                          </button>
                        </TooltipTrigger>
                        {dayEvents.length > 0 && (
                          <TooltipContent className="p-0">
                            <div className="p-2">
                              <p className="font-semibold mb-1">
                                {date.toLocaleDateString()}
                              </p>
                              <ul className="space-y-1">
                                {dayEvents.map((event) => (
                                  <li key={event.id} className="text-xs">
                                    {event.title}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  );
                },
              }}
            />
          </div>
          <div className="md:col-span-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">
                  {selectedDate?.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </h3>
                <div className="flex space-x-2">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-destructive" />
                    <span>Deadline</span>
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-amber-500" />
                    <span>Reminder</span>
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span>Completed</span>
                  </Badge>
                </div>
              </div>

              {selectedEvents.length > 0 ? (
                <div className="space-y-3 mt-4">
                  {selectedEvents.map((event) => (
                    <div
                      key={event.id}
                      className="p-3 rounded-lg border bg-card hover:bg-accent/50 cursor-pointer transition-colors"
                      onClick={() => handleEventClick(event)}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-foreground">
                            {event.title}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {event.description}
                          </p>
                        </div>
                        <div>
                          {event.type === "deadline" && (
                            <AlertCircle className="h-5 w-5 text-destructive" />
                          )}
                          {event.type === "reminder" && (
                            <CalendarIcon className="h-5 w-5 text-amber-500" />
                          )}
                          {event.type === "completed" && (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-48 text-muted-foreground">
                  <CalendarIcon className="h-12 w-12 mb-2 opacity-20" />
                  <p>No events scheduled for this date</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComplianceCalendar;
