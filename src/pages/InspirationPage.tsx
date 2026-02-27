import { useState } from "react";

const fallbackMessages = [
    "Take a small step today.",
    "Focus on one thing at a time.",
    "It is okay to move slowly.",
    "Write down what you finished."
];

export default function InspirationPage() {
    const [message, setMessage] = useState("No message loaded yet.");
    const [isLoading, setIsLoading] = useState(false);

    async function handleShowMessage() {
        if (isLoading) return;

        setIsLoading(true);

        try {
            const response = await fetch(
                "https://motivational-spark-api.vercel.app/api/quotes/random"
            );

            if (!response.ok) {
                throw new Error("Request failed");
            }

            const data = await response.json();
            const newMessage = data.quote;

            setMessage(newMessage);
        } catch (_error) {
            const randomIndex = Math.floor(Math.random() * fallbackMessages.length);
            const backupMessage = fallbackMessages[randomIndex];

            setMessage(backupMessage);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <section className="page">
            <header className="page-header">
                <h2 className="page-title">Inspiration</h2>
                <p className="page-subtitle">
                    Short messages for moments when a small push helps.
                </p>
            </header>

            <div className="card">
                <p>{message}</p>

                <button
                    type="button"
                    onClick={handleShowMessage}
                    disabled={isLoading}
                >
                    {isLoading ? "Loading..." : "Show message"}
                </button>
            </div>

            <p>
                Messages are loaded from an external API. If loading fails, one of the
                saved messages is shown instead.
            </p>
        </section>
    );
}