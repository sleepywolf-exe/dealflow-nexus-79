import { useState } from 'react';
import { Calendar, Clock, MapPin, User, Plus, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { mockTasks, mockLeads, mockProperties, mockUsers } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewType, setViewType] = useState<'month' | 'week' | 'day'>('month');
  const { toast } = useToast();

  const handleScheduleVisit = () => {
    toast({
      title: "Visit Scheduled",
      description: "Property visit has been scheduled successfully",
    });
  };

  const handleCreateTask = () => {
    toast({
      title: "Task Created",
      description: "New task has been added to your calendar",
    });
  };

  // Enhanced mock tasks with more variety
  const calendarTasks = [
    ...mockTasks,
    {
      id: '3',
      title: 'Property inspection - Downtown Apartment',
      description: 'Routine inspection with maintenance team',
      dueAt: new Date('2024-01-25T10:00:00'),
      relatedType: 'Property' as const,
      relatedId: '1',
      assigneeId: '2',
      status: 'Open' as const,
      createdAt: new Date('2024-01-20'),
    },
    {
      id: '4',
      title: 'Client meeting - Maria Rodriguez',
      description: 'Final negotiation for Villa purchase',
      dueAt: new Date('2024-01-26T14:00:00'),
      relatedType: 'Lead' as const,
      relatedId: '2',
      assigneeId: '3',
      status: 'Open' as const,
      createdAt: new Date('2024-01-20'),
    },
    {
      id: '5',
      title: 'Market research - Waterfront area',
      description: 'Analyze pricing trends and competition',
      dueAt: new Date('2024-01-27T09:00:00'),
      relatedType: 'Property' as const,
      relatedId: '3',
      assigneeId: '2',
      status: 'Open' as const,
      createdAt: new Date('2024-01-21'),
    },
  ];

  const getTasksForDate = (date: Date) => {
    return calendarTasks.filter(task => 
      task.dueAt.toDateString() === date.toDateString()
    );
  };

  const getTaskType = (task: any) => {
    if (task.title.toLowerCase().includes('visit') || task.title.toLowerCase().includes('viewing')) {
      return { type: 'visit', color: 'bg-primary', icon: MapPin };
    }
    if (task.title.toLowerCase().includes('meeting') || task.title.toLowerCase().includes('call')) {
      return { type: 'meeting', color: 'bg-accent', icon: User };
    }
    return { type: 'task', color: 'bg-warning', icon: Clock };
  };

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const current = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    return days;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Calendar & Tasks</h1>
          <p className="text-muted-foreground mt-1">Manage your schedule and property visits</p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <MapPin className="w-4 h-4 mr-2" />
                Schedule Visit
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Schedule Property Visit</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="lead">Client/Lead</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select client" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockLeads.map(lead => (
                        <SelectItem key={lead.id} value={lead.id}>{lead.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="property">Property</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select property" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockProperties.map(property => (
                        <SelectItem key={property.id} value={property.id}>{property.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="date">Date & Time</Label>
                  <Input type="datetime-local" />
                </div>
                <div>
                  <Label htmlFor="agent">Assigned Agent</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select agent" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockUsers.filter(user => user.role === 'Agent').map(agent => (
                        <SelectItem key={agent.id} value={agent.id}>{agent.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleScheduleVisit} className="w-full">
                  Schedule Visit
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Add Task
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Task</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Task Title</Label>
                  <Input placeholder="Enter task title" />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea placeholder="Task description" />
                </div>
                <div>
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input type="datetime-local" />
                </div>
                <div>
                  <Label htmlFor="assignee">Assignee</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Assign to" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockUsers.map(user => (
                        <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleCreateTask} className="w-full">
                  Create Task
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-3">
          <div className="data-card">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" onClick={() => {
                  const newDate = new Date(currentDate);
                  newDate.setMonth(newDate.getMonth() - 1);
                  setCurrentDate(newDate);
                }}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <h2 className="text-xl font-semibold">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <Button variant="ghost" size="sm" onClick={() => {
                  const newDate = new Date(currentDate);
                  newDate.setMonth(newDate.getMonth() + 1);
                  setCurrentDate(newDate);
                }}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant={viewType === 'month' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setViewType('month')}
                >
                  Month
                </Button>
                <Button 
                  variant={viewType === 'week' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setViewType('week')}
                >
                  Week
                </Button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {dayNames.map(day => (
                <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                  {day}
                </div>
              ))}
              
              {generateCalendarDays().map((date, index) => {
                const tasks = getTasksForDate(date);
                const isCurrentMonth = date.getMonth() === currentDate.getMonth();
                const isToday = date.toDateString() === new Date().toDateString();
                
                return (
                  <div
                    key={index}
                    className={`min-h-[100px] p-2 border border-border/30 cursor-pointer hover:bg-muted/20 transition-colors ${
                      !isCurrentMonth ? 'text-muted-foreground bg-muted/10' : ''
                    } ${isToday ? 'bg-primary/10 border-primary/30' : ''}`}
                    onClick={() => setSelectedDate(date)}
                  >
                    <div className={`text-sm font-medium mb-1 ${isToday ? 'text-primary' : ''}`}>
                      {date.getDate()}
                    </div>
                    <div className="space-y-1">
                      {tasks.slice(0, 2).map(task => {
                        const taskInfo = getTaskType(task);
                        return (
                          <div
                            key={task.id}
                            className={`text-xs p-1 rounded text-white ${taskInfo.color} truncate`}
                          >
                            {formatTime(task.dueAt)} {task.title.split(' ').slice(0, 2).join(' ')}
                          </div>
                        );
                      })}
                      {tasks.length > 2 && (
                        <div className="text-xs text-muted-foreground">
                          +{tasks.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar - Today's Tasks */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Today's Schedule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {getTasksForDate(new Date()).map(task => {
                const taskInfo = getTaskType(task);
                const IconComponent = taskInfo.icon;
                
                return (
                  <div key={task.id} className="flex items-start gap-3 p-3 bg-muted/20 rounded-lg">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${taskInfo.color}`}>
                      <IconComponent className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm line-clamp-1">{task.title}</p>
                      <p className="text-xs text-muted-foreground">{formatTime(task.dueAt)}</p>
                      {task.description && (
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {task.description}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
              
              {getTasksForDate(new Date()).length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No tasks scheduled for today</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Upcoming Tasks */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Tasks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {calendarTasks
                .filter(task => task.dueAt > new Date())
                .sort((a, b) => a.dueAt.getTime() - b.dueAt.getTime())
                .slice(0, 5)
                .map(task => {
                  const taskInfo = getTaskType(task);
                  const IconComponent = taskInfo.icon;
                  
                  return (
                    <div key={task.id} className="flex items-center gap-3 p-2 hover:bg-muted/20 rounded transition-colors">
                      <div className={`w-6 h-6 rounded flex items-center justify-center ${taskInfo.color}`}>
                        <IconComponent className="w-3 h-3 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-1">{task.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {task.dueAt.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}