import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AIVoiceAssistant from "../src/components/dashboard/AIVoiceAssistant";
import DashboardService from "../src/services/dashboard";

vi.mock("../src/services/dashboard", () => ({
  default: {
    chatAI: vi.fn(),
    getSystemStatus: vi.fn(),
    getEmergencyStatus: vi.fn(),
  },
}));

beforeEach(() => {
  vi.clearAllMocks();

  window.speechSynthesis = {
    speak: vi.fn(),
    cancel: vi.fn(),
  } as any;

  (window as any).SpeechSynthesisUtterance = vi
    .fn()
    .mockImplementation((text: string) => ({ text }));
});

describe("AIVoiceAssistant", () => {
  test("renders default greeting", () => {
    render(<AIVoiceAssistant />);

    expect(
      screen.getByText(/Hello! I'm StadiumVerse AI/i)
    ).toBeInTheDocument();
  });

  test("calls AI backend successfully", async () => {
    (DashboardService.chatAI as any).mockResolvedValue({
      response: "Gate A currently has the shortest queue.",
    });

    render(<AIVoiceAssistant />);

    fireEvent.change(screen.getByPlaceholderText("Ask anything..."), {
      target: { value: "Best gate?" },
    });

    fireEvent.click(screen.getByText("Ask"));

    await waitFor(() => {
      expect(
        screen.getByText("Gate A currently has the shortest queue.")
      ).toBeInTheDocument();
    });

    expect(DashboardService.chatAI).toHaveBeenCalledWith("Best gate?");
  });

  test("uses local fallback if AI fails", async () => {
    (DashboardService.chatAI as any).mockRejectedValue(
      new Error("offline")
    );

    (DashboardService.getSystemStatus as any).mockResolvedValue({
      activeGate: "Gate D",
      crowdLevel: 35,
      weather: "Cloudy",
      event: "FIFA World Cup",
      navigationUsers: 150,
      stadiumHealth: 97,
    });

    (DashboardService.getEmergencyStatus as any).mockResolvedValue({
      active: false,
    });

    render(<AIVoiceAssistant />);

    fireEvent.change(screen.getByPlaceholderText("Ask anything..."), {
      target: { value: "Which gate?" },
    });

    fireEvent.click(screen.getByText("Ask"));

    await waitFor(() => {
      expect(
        screen.getByText(/Gate D/)
      ).toBeInTheDocument();
    });
  });

  test("does not call backend for empty question", async () => {
    render(<AIVoiceAssistant />);

    fireEvent.click(screen.getByText("Ask"));

    await new Promise((r) => setTimeout(r, 50));

    expect(DashboardService.chatAI).not.toHaveBeenCalled();
  });
});