type OpeningInterval = {
    from: string;
    to: string;
} | null;

export type OpeningHours = {
    monday: OpeningInterval;
    tuesday: OpeningInterval;
    wednesday: OpeningInterval;
    thursday: OpeningInterval;
    friday: OpeningInterval;
    saturday: OpeningInterval;
    sunday: OpeningInterval;
}