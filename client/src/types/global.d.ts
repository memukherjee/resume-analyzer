export {};

declare global {
    type ResumeScore = {
        score: number;
        keyPoints: string[];
        improvements: string[];
    };
    interface Resume {
        fileName: string;
        result: {
            name: string;
            score: number;
        } | null;
        status: ResumeStatus;
    }
}
