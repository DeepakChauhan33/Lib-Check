import { useState } from "react";
import { createReport } from "../services/reportService";

function RateLibraryModal({ isOpen, onClose, onSubmitted }) {
  const [ratings, setRatings] = useState({
    wifi: 0,
    water: 0,
    ac: 0,
    electricity: 0,
    rain: 0,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const resetForm = () => {
    setRatings({
      wifi: 0,
      water: 0,
      ac: 0,
      electricity: 0,
      rain: 0,
    });

    setError("");
  };

  const handleClose = () => {
    if (isSubmitting) {
      return;
    }

    resetForm();
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  const handleRatingChange = (parameter, value) => {
    setRatings((previousRatings) => ({
      ...previousRatings,
      [parameter]: value,
    }));

    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setError("");

    const hasEmptyRating = Object.values(ratings).some(
      (rating) => rating === 0
    );

    if (hasEmptyRating) {
      setError("Please rate all parameters.");
      return;
    }

    try {
      setIsSubmitting(true);

      await createReport(ratings);

      resetForm();

      onClose();

      if (onSubmitted) {
        await onSubmitted();
      }
    } catch (error) {
      console.error("REPORT SUBMISSION ERROR:", error);

      setError(
        error.message || "Unable to submit your rating. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const parameters = [
    {
      key: "wifi",
      label: "Wi-Fi",
    },
    {
      key: "water",
      label: "Water",
    },
    {
      key: "ac",
      label: "AC",
    },
    {
      key: "electricity",
      label: "Electricity",
    },
    {
      key: "rain",
      label: "Rain",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/40 p-4">

      <div className="my-auto w-full max-w-md rounded-2xl bg-white p-5 shadow-xl sm:p-6">

        {/* Header */}
        <div className="flex items-center justify-between">

          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Rate Library
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              How are the library conditions right now?
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
            className="text-xl text-slate-400 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            ×
          </button>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-5"
        >

          {parameters.map((parameter) => (
            <div
              key={parameter.key}
              className="flex items-center justify-between gap-4"
            >

              <span className="text-sm font-medium text-slate-700">
                {parameter.label}
              </span>

              <div className="flex gap-1">

                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    disabled={isSubmitting}
                    onClick={() =>
                      handleRatingChange(
                        parameter.key,
                        value
                      )
                    }
                    className={`flex h-9 w-9 items-center justify-center rounded-md text-sm transition disabled:cursor-not-allowed ${ratings[parameter.key] >= value
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-400 hover:bg-slate-200"
                      }`}
                  >
                    {value}
                  </button>
                ))}

              </div>

            </div>
          ))}

          {/* Error */}
          {error && (
            <div className="rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting
              ? "Submitting..."
              : "Submit Rating"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default RateLibraryModal;