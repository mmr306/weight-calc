"use client";

import { useState } from "react";
import { Button } from "@nextui-org/button";
import { title, subtitle } from "@/components/primitives";
import {Input} from "@nextui-org/react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";

interface DictWithWeights {
	key: string;
	weights: Record<string, number>;
}

export const Counter = () => {
 	const [count, setCount] = useState(0);
	const [targetWeightString, setTargetWeight] = useState('');
	const [barWeightString, setBarWeight] = useState('');
	const [outputList, setOutputList] = useState<Record<string, number>>({});
	const [outputRowList, setOutputRows] = useState<DictWithWeights[]>([]);

	function calculateWeightPlates(targetWeight: number, barWeight: number, percentage: number): Record<string, number> {
		// Constants
		const plateWeightOptions = [45, 35, 25, 15, 10, 5, 2.5, 1.0, 0.5];
	 	 // Calculate remaining weight after the bar
		let remainingWeight = targetWeight - barWeight;
	  
		// Initialize result object
		const result: Record<string, number> = {};
		result['percentage'] = percentage
		result['weight'] = targetWeight
		result['45'] = 0
		result['35'] = 0
		result['25'] = 0
		result['15'] = 0
		result['10'] = 0
		result['5'] = 0
		result['2.5'] = 0
		result['1.0'] = 0
		result['0.5'] = 0
		// Validate input
		if (targetWeight < barWeight) {
		  console.log("Target weight must be greater than or equal to the bar weight.");
		  result[`${barWeight}`] = 1
		} else {	  	
			// Loop through plate options to calculate the number of each plate needed
			for (const plateWeight of plateWeightOptions) {
				if (remainingWeight >= plateWeight * 2) {
					const plateCount = Math.floor(remainingWeight / (plateWeight * 2));
					result[`${plateWeight}`] = plateCount;
					remainingWeight -= plateCount * plateWeight * 2;
				}
			}
		
			// If there's remaining weight, it couldn't be perfectly balanced
			if (remainingWeight > 0) {
				console.log("Warning: The target weight couldn't be perfectly balanced with the available plates.");
			}
			
		}
		return result;
	  }
	const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		const enteredName = event.target.value;
		let targetWeight = 0;
		if (/^-?\d*$/.test(enteredName)) {
			targetWeight = parseInt(enteredName, 10);
		} 
		
		setTargetWeight(enteredName);
	};
	const inputHandlerBarWeight = (event: React.ChangeEvent<HTMLInputElement>) => {
		const enteredBarWeight = event.target.value;
		let barWeight = 45;
		if (/^-?\d*$/.test(enteredBarWeight)) {
			barWeight = parseInt(enteredBarWeight, 10);
		} 
		setBarWeight(enteredBarWeight);
	};
	const handleClick  = () => {
		let barWeight = 45;
		if (/^-?\d*$/.test(barWeightString)) {
			barWeight = parseInt(barWeightString, 10);
		} 
		let targetWeight = 0;
		if (/^-?\d*$/.test(targetWeightString)) {
			targetWeight = parseInt(targetWeightString, 10);
		} 
		const result = calculateWeightPlates(targetWeight, barWeight, 100);
		for (const plate in result) {
			console.log(`${result[plate]} x ${plate}`);
		}
		let listOfWeights: DictWithWeights[] = []
		for (let i = 5; i <= 100; i += 5) {
			const percentage = (targetWeight * i) / 100;
			const result = calculateWeightPlates(percentage, barWeight , i);
			let row = { key: `${i}`, weights: result }
			listOfWeights.push(row);
		}
		
		setOutputRows(listOfWeights);
		setOutputList(result);
	};
	return (
		<div className="inline-block max-w-lg text-center justify-center">	
			<Input
				key="outside"
				label="Input Weight in lbs"
				labelPlacement="outside"
				placeholder="Ex. 300"
				onChange ={inputHandler}
			/>
			<br />
			<Input
				key="outside"
				label="Bar Weight in lbs"
				labelPlacement="outside"
				placeholder="Ex. 300"
				onChange ={inputHandlerBarWeight}
			/>
			<br />	
			<Button radius="full" onClick={handleClick}>
				Submit
			</Button>
			<br />
			<h1 className={title()}>Weight: &nbsp;</h1>
			<h1 className={title({ color: "violet" })}>{targetWeightString}</h1>
			<br />
			<hr />
			<br />
			<div>
			<Table aria-label="Example empty table">
				<TableHeader>
					<TableColumn key='percentage'>Percentage</TableColumn>
					<TableColumn key='weight'>Weight</TableColumn>
					<TableColumn key='45'>45</TableColumn>
					<TableColumn key='35'>35</TableColumn>
					<TableColumn key='25'>25</TableColumn>
					<TableColumn key='15'>15</TableColumn>
					<TableColumn key='10'>10</TableColumn>
					<TableColumn key='5'>5</TableColumn>
					<TableColumn key='2.5'>2.5</TableColumn>
					<TableColumn key='1.0'>1.0</TableColumn>
					<TableColumn key='0.5'>0.5</TableColumn>
				</TableHeader>
				<TableBody items={outputRowList}>
					{(item) => (
					<TableRow key={item.key}>
						{(columnKey) => <TableCell>{getKeyValue(item['weights'], columnKey)}</TableCell>}
					</TableRow>
					)}
				</TableBody>
			</Table>
			</div>
		</div>
	);
};
