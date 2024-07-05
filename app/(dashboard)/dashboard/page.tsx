import CardWhatsapp from '@/components/dashboard-components/cardWhatsapp';
import { CalendarDateRangePicker } from '@/components/date-range-picker';
import { Overview } from '@/components/overview';
import { RecentSales } from '@/components/recent-sales';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';

export default function page() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Meus Clientes</h2>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="hubspot">Hubspot</TabsTrigger>
            <TabsTrigger value="analytics" disabled>
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardWhatsapp />
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="hubspot" className="space-y-4">
            <Button>
              <Link
                href={
                  'https://app.hubspot.com/oauth/authorize' +
                  `?client_id=${encodeURIComponent(
                    `a726326a-9d26-435a-a401-dc847b13710f`
                  )}` +
                  `&scope=${encodeURIComponent(`contacts%20social`)}` +
                  `&redirect_uri=${encodeURIComponent(
                    `http://localhost:3000/hello/Marcelo`
                  )}` +
                  `&state=${encodeURIComponent(
                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbHk5OWJub3owMDAwM3BzZWNkenB3NmNxIiwiaWF0IjoxNzIwMjE3OTAxLCJleHAiOjE3MjE1MTM5MDF9.V2l4YCFgGL0yFynscqaSt-fR8tS4BFuR-4Kc8VaZoaU'
                  )}`
                }
              >
                Configurar
              </Link>
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
}
