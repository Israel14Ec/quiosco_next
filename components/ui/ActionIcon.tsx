import { ReactNode } from "react"

type ActionIconProps = {
    icon: ReactNode
    children: ReactNode
    className: string
} 

export default function ActionIcon({icon, children, className} : ActionIconProps) {
    return (
        <div className={`flex items-center gap-1 ${className}`}>
            <div className="w-4">
                {icon}
            </div>
            { children }
        </div>
    )
}
