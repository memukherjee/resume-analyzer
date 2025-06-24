export default function ResumeScoreDashboard({
    analyzedResumeData
}: {
    analyzedResumeData: ResumeScore;
}) {
    return (
        <>
            <div>
                <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                        className="text-gray-200 stroke-current"
                        strokeWidth="10"
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"></circle>
                    <circle
                        className="text-indigo-500  progress-ring__circle stroke-current"
                        strokeWidth="10"
                        strokeLinecap="round"
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        strokeDasharray="251.2"
                        strokeDashoffset={`calc(251.2 - (251.2 * ${analyzedResumeData.score}) / 100)`}></circle>

                    <text
                        x="50"
                        y="50"
                        fontSize="12"
                        textAnchor="middle"
                        alignmentBaseline="middle">
                        {analyzedResumeData.score}%
                    </text>
                </svg>
            </div>
            <div className="text-left w-1/2">
                <header className="font-medium text-3xl underline underline-offset-8 mb-2">
                    Keypoints
                </header>
                <ul className="ps-4">
                    {analyzedResumeData.keyPoints?.map((point, index) => (
                        <li key={index} className="list-disc">
                            {point}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="text-left w-1/2">
                <header className="font-medium text-3xl underline underline-offset-8 mb-2">
                    Improvements to be done
                </header>
                <ul className="ps-4">
                    {analyzedResumeData.improvements?.map((point, index) => (
                        <li key={index} className="list-disc">
                            {point}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
