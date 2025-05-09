import { createFileRoute } from "@tanstack/react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { dataChart, mockUsers, PatientData } from "@/assets/data";
import { average, formatDate, getRandomColor } from "@/lib/utils";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useContactUtils, useSetDocument, useVeltClient } from "@veltdev/react";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
);

export const Route = createFileRoute("/dashboard")({
	component: Dashboard,
});

function Dashboard() {
	const { user } = useAuth0();
	const [users, setUsers] = useState<User[]>([]);

	// Get users from Auth0
	useEffect(() => {
		async function fetchUsers() {
			try {
				const data = mockUsers.map((user) => {
					return {
						...user,
						userId: nanoid(),
						color: getRandomColor(),
					};
				});

				setUsers(data);
			} catch (e) {
				console.log(e);
			}
		}

		fetchUsers();
	}, []);

	// Initialize Velt and set current user
	const { client } = useVeltClient();

	useEffect(() => {
		async function initVelt() {
			if (client) {
				const currentUser = {
					userId: nanoid(),
					organizationId: "Ministry of Health",
					color: getRandomColor(),
					name: user?.name ?? "Unknown",
					email: user?.email ?? "",
					photoUrl: user?.picture ?? "",
					textColor: "#fff",
				};

				await client.identify(currentUser);

				setUsers((prevUsers) =>
					!prevUsers.includes(currentUser)
						? [...prevUsers, currentUser]
						: prevUsers,
				);
			}
		}
		initVelt().catch(console.error);
	}, [client, user?.email, user?.name, user?.picture]);

	// Update Contact List
	const contactModule = useContactUtils();

	useEffect(() => {
		if (contactModule && users.length > 0) {
			contactModule.updateContactList(users, { merge: true });
		}
	}, [contactModule, users]);

	// Set document
	useSetDocument("001", {
		documentName: "Patient Data",
		lastUpdated: new Date().toISOString(),
	});

	return (
		<>
			<main className="px-4 py-8 grid gap-4 md:grid-cols-6 max-w-11/12 mx-auto">
				{/* Patient Profile */}
				<section className="md:col-span-2 md:row-span-2 grid gap-8 h-max">
					{/* Profile Picture */}
					<div className="flex md:flex-col lg:flex-row gap-4 items-center md:items-start lg:items-center">
						<Avatar className="w-32 h-32">
							<AvatarImage src={PatientData.profile_picture} />
							<AvatarFallback>{PatientData.name.split(" ")[0]}</AvatarFallback>
						</Avatar>
						<div>
							<h1 className="text-2xl font-bold text-gray-800">
								{PatientData.name}
							</h1>
							<p className="text-sm text-gray-600">{PatientData.gender}</p>
						</div>
					</div>

					{/* General info */}
					<div className="flex flex-col gap-8">
						<h2 className="text-2xl text-emerald-600 font-bold">
							General Info
						</h2>

						<div className="grid gap-4 grid-cols-3">
							<h3 className="text-gray-600">Date of Birth:</h3>
							<p className="col-span-2 text-gray-800">
								{formatDate(new Date(PatientData.date_of_birth))} (
								{PatientData.age} years old)
							</p>
							<h3 className="text-gray-600">Emergency Contact:</h3>
							<p className="col-span-2 text-gray-800">
								{PatientData.emergency_contact}
							</p>
							<h3 className="text-gray-600">Insurance Type:</h3>
							<p className="col-span-2 text-gray-800">
								{PatientData.insurance_type}
							</p>
						</div>
						<h3 className="text-gray-600 font-bold text-xl">Lab Tests Done</h3>
						<ul className="list-disc list-inside">
							{PatientData.lab_results.map((result) => (
								<li key={nanoid()} className="text-gray-800">
									{result}
								</li>
							))}
						</ul>
					</div>
				</section>

				{/* Medical Data */}
				<section className="md:col-span-4 flex flex-col gap-8">
					<h2 className="text-2xl text-emerald-600 font-semibold">
						Medical Data
					</h2>

					<div className="card">
						<h3 className="font-bold text-xl text-gray-600">Blood Pressure</h3>

						<div className="grid gap-4 md:grid-cols-4">
							<div className="md:col-span-3">
								<Line options={{ responsive: true }} data={dataChart} />
							</div>

							<div className="md:col-span-1 flex md:flex-col gap-4">
								<div className="flex items-center gap-2">
									<p className="text-sm">Systolic:</p>
									<p className="text-lg font-bold">
										{average(
											PatientData.diagnosis_history.map(
												(item) => item.blood_pressure.systolic.value,
											),
										)}
									</p>
								</div>

								<div className="flex items-center gap-2">
									<p className="text-sm">Diastolic:</p>
									<p className="text-lg font-bold">
										{average(
											PatientData.diagnosis_history.map(
												(item) => item.blood_pressure.diastolic.value,
											),
										)}
									</p>
								</div>
							</div>
						</div>

						<h3 className="font-bold text-xl text-gray-600">Core Vitals</h3>

						<div className="grid gap-4 md:grid-cols-3">
							<div className="p-4 bg-emerald-50 rounded-xl">
								<p>Respiratory Rate</p>
								<p className="text-lg font-bold">
									{average(
										PatientData.diagnosis_history.map(
											(item) => item.respiratory_rate.value,
										),
									)}{" "}
									bpm
								</p>
							</div>
							<div className="p-4 rounded-xl bg-emerald-50">
								<p>Temperature</p>
								<p className="text-lg font-bold">
									{average(
										PatientData.diagnosis_history.map(
											(item) => item.temperature.value,
										),
									)}
									°C
								</p>
							</div>
							<div className="p-4 rounded-xl bg-red-50">
								<p>Heart Rate</p>
								<p className="text-lg font-bold">
									{average(
										PatientData.diagnosis_history.map(
											(item) => item.heart_rate.value,
										),
									)}{" "}
									bpm
								</p>
							</div>
						</div>
					</div>

					<div className="card">
						<h3 className="font-bold text-xl text-gray-600">Diagnostic List</h3>

						<div className="overflow-x-auto">
							<table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
								<thead className="bg-gray-100">
									<tr>
										<th className="text-left px-6 py-3 text-gray-600 uppercase text-sm">
											Name
										</th>
										<th className="text-left px-6 py-3 text-gray-600 uppercase text-sm">
											Description
										</th>
										<th className="text-left px-6 py-3 text-gray-600 uppercase text-sm">
											Status
										</th>
									</tr>
								</thead>
								<tbody>
									{PatientData.diagnostic_list.map((item) => (
										<tr key={nanoid()} className="border-b">
											<td className="px-6 py-4 text-gray-800">{item.name}</td>
											<td className="px-6 py-4 text-gray-600">
												{item.description}
											</td>
											<td className="px-6 py-4">
												<StatusBadge status={item.status} />
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}

function StatusBadge({ status }: { status: string }) {
	const statusColors: Record<string, string> = {
		"Active treatment": "bg-green-100 text-green-700",
		Untreated: "bg-red-100 text-red-700",
		"Under observation": "bg-yellow-100 text-yellow-700",
	};

	return (
		<span
			className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[status] || "bg-gray-100 text-gray-700"}`}
		>
			{status}
		</span>
	);
}
