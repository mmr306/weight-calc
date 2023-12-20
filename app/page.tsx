import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code"
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { Counter } from "@/components/counter"
import {Input} from "@nextui-org/react";
import {Button} from "@nextui-org/react";

export default function Home() {
	const placements = [
		"outside"
	  ];
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">

			<div className="flex flex-col gap-2">
				<div className="flex flex-wrap gap-4 items-center">
					<Counter></Counter>
				</div>
			</div>
		</section>
	);
}
