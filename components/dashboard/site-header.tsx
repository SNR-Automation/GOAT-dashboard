import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Bell } from "lucide-react"

export function SiteHeader({ onLogout }: { onLogout: () => void }) {
  return (
    <header className="flex h-[60px] shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 h-4"
        />
        <h1 className="text-base font-medium">SNR Automations</h1>
        <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm" className="hover:bg-transparent hover:text-foreground">
                <Bell className="h-4 w-4" />
            </Button>
            <Button onClick={onLogout} variant="outline" size="sm" className="hover:bg-transparent hover:text-foreground">
                Logout
            </Button>
        </div>
      </div>
    </header>
  )
}
