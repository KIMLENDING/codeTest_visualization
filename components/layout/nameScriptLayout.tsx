import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import Link from 'next/link'
import { SquareArrowOutUpRight } from 'lucide-react'

const NameScriptLayout = ({ title, hrefLink, children }: { title: string, hrefLink: string, children: React.ReactNode }) => {
    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <div className="flex flex-row items-center gap-2">
                    <CardTitle className="text-xl sm:text-2xl">{title}</CardTitle>
                    <Link href={hrefLink}>
                        <SquareArrowOutUpRight className="h-5 w-5" />
                    </Link>
                </div>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    )
}

export default NameScriptLayout