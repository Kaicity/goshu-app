import { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type StatusCardProps = {
  value: number | string
  unit: string
  description: string
  buttonLabel?: string
  onButtonClick?: () => void
  color?: "green" | "red" | "blue" | "yellow"
}

export default function StatusCard({
  value,
  unit,
  description,
  buttonLabel,
  onButtonClick,
  color = "green"
}: StatusCardProps) {
  const colorClasses: Record<string, string> = {
    green: "border-green-300 text-green-600",
    red: "border-red-300 text-red-600",
    blue: "border-blue-300 text-blue-600",
    yellow: "border-yellow-300 text-yellow-600"
  }

  return (
    <Card className={colorClasses[color]}>
      <CardHeader>
        <CardTitle className={`text-3xl ${colorClasses[color].split(" ")[1]}`}>
          {value}
        </CardTitle>
        <CardDescription>{unit}</CardDescription>
        <CardAction>
            {/* <Button variant="outline" size="sm" onClick={onButtonClick} disabled={!buttonLabel}>
                {buttonLabel || "N/A"}
          </Button> */}
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{description}</p>
      </CardContent>
    </Card>
  )
}
