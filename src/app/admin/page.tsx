import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import LayoutWrapper from '@/components/LayoutWrapper';
import AdminHeader from '@/components/(admin)/AdminHeader';
import AdminStatsCard from '@/components/(admin)/AdminStatsCard';
import AdminEventsTableBody from '@/components/(admin)/AdminEventsTableBody'
import { getEventsAction } from '@/actions/event'
import AdminUsersTableBody from '@/components/(admin)/AdminUsersTableBody'
import { getParticipantsAction } from '@/actions/participants'

const Admin = () => {
    return (
        <LayoutWrapper>
            <div className="space-y-8">
                {/* Header */}
                <AdminHeader />

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <AdminStatsCard />
                </div>

                {/* Main Content */}
                <Tabs defaultValue="users" className="space-y-6">
                    <TabsList className="flex flex-wrap w-full lg:w-auto">
                        <TabsTrigger value="users">Users</TabsTrigger>
                        <TabsTrigger value="events">Events</TabsTrigger>
                        <TabsTrigger value="analytics">Analytics</TabsTrigger>
                        <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>

                    <TabsContent value="users" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>User Management</CardTitle>
                                <CardDescription>Manage club members and their participation</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead>Role</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Events Won</TableHead>
                                            <TableHead>Events Participated</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <AdminUsersTableBody usersPromise={getParticipantsAction()} />
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="events" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Event Management</CardTitle>
                                <CardDescription>Manage club events and registrations</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Event Title</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Registrations</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <AdminEventsTableBody eventsPromise={getEventsAction()} />
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="analytics" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Monthly Registrations</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-64 flex items-center justify-center text-muted-foreground">
                                        [Chart Component Would Go Here]
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Event Popularity</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-64 flex items-center justify-center text-muted-foreground">
                                        [Chart Component Would Go Here]
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="settings" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Club Settings</CardTitle>
                                <CardDescription>Configure your club preferences</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-medium">Event Auto-approval</h4>
                                        <p className="text-sm text-muted-foreground">Automatically approve event registrations</p>
                                    </div>
                                    <Button variant="outline">Toggle</Button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-medium">Email Notifications</h4>
                                        <p className="text-sm text-muted-foreground">Send notifications for new events</p>
                                    </div>
                                    <Button variant="outline">Configure</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </LayoutWrapper>
    )
}

export default Admin