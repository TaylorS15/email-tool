import React from "react";
import ClientDocument from "./ClientDocument/ClientDocument";
import ClientCreation from "./ClientCreation";

const ClientList = ({ clientList, requestClientList, requestEmailList }) => {
	return (
		<div className="mb-16 shadow-blur rounded-lg">
			<div className="h-4 bg-color3 rounded-t-md"></div>
			<div className="px-2 flex flex-row text-md">
				<p className="text-lg p-2">Client List</p>
			</div>
			<div className="max-h-[48rem] overflow-y-auto">
				{!clientList || !clientList.length ? (
					<p className="px-6">Client list is empty.</p>
				) : (
					clientList.map((client) => {
						return (
							<ClientDocument
								key={client.info.businessName}
								clientData={client}
								requestClientList={requestClientList}
							/>
						);
					})
				)}
			</div>

			<ClientCreation
				clientList={clientList}
				requestClientList={requestClientList}
				requestEmailList={requestEmailList}
			/>
		</div>
	);
};

export default ClientList;
