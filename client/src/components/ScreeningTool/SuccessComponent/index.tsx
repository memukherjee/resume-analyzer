import { ResumeStatus } from '../../../types/constants';

type PropsType = {
    resumesData: Array<Resume>;
};

export default function SuccessComponent({ resumesData }: PropsType) {
    if (!resumesData) {
        return;
    }
    return (
        <div className="relative flex flex-col w-full h-full overflow-scroll shadow-md rounded-xl bg-clip-border">
            <table className="w-full text-left table-auto min-w-max">
                <thead>
                    <tr className="border-b-2 text-primary">
                        <th className="p-4">File Name</th>
                        <th className="p-4">Candidate's Name</th>
                        <th className="p-4">Score (Out of 100)</th>
                        <th className="p-4">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {resumesData.map((data, index) => (
                        <tr key={index} className="border-b border-gray-300">
                            <td className="p-4">{data.fileName}</td>
                            <td className="p-4">{data.result?.name}</td>
                            <td className="p-4">{data.result?.score}</td>
                            <td
                                className="p-4"
                                style={
                                    data.status === ResumeStatus.ACCEPTED
                                        ? {
                                              color: 'green'
                                          }
                                        : data.status === ResumeStatus.REJECTED
                                          ? {
                                                color: 'red'
                                            }
                                          : {
                                                color: 'gray'
                                            }
                                }>
                                {data.status}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
