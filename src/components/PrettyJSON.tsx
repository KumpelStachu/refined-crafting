function color(text: string): string {
	return text
		.replace(/(?<=: )[\d\.e+]+/g, '<code class="text-warning">$&</code>')
		.replace(/(?<=: )"[\s\S]*"/g, '<code class="text-success">$&</code>')
		.replace(/"\S*"(?=: )/g, '<code class="text-error">$&</code>')
		.replace(/{|}|\[|\]/g, '<code class="text-info">$&</code>')
}

type Props = {
	value: any
	children?: React.ReactNode
}

export default function PrettyJSON({ children, value }: Props) {
	return (
		<div className="relative mockup-code">
			{children}
			{JSON.stringify(value, null, 2)
				.split('\n')
				.map((line, index) => (
					<pre key={index} data-prefix={index + 1} dangerouslySetInnerHTML={{ __html: color(line) }}></pre>
				))}
		</div>
	)
}
