import { useState } from 'react'

type Props = {
	children: React.ReactElement[]
}

export default function Tabs({ children }: Props) {
	const [selected, setSelected] = useState(0)

	return (
		<div className="flex flex-col h-screen overflow-hidden">
			<div className="sticky inset-x-0 top-0 z-10 justify-center tabs tabs-boxed">
				{children.map(({ type }, index) => (
					<a
						key={(type as any).title}
						className={`tab ${selected === index ? 'tab-active' : ''}`}
						onClick={() => setSelected(index)}
					>
						{(type as any).title}
					</a>
				))}
			</div>
			<div
				className="flex transition flex-1 max-h-[calc(100vh-2.5rem)]"
				style={{ transform: `translateX(-${selected}00%)` }}
			>
				{children.map(child => (
					<div key={(child.type as any).title} className="w-full p-3 overflow-y-auto scroll-smooth shrink-0">
						{child}
					</div>
				))}
			</div>
		</div>
	)
}
