"use client";

import { useState } from "react";
import { generateText } from "ai";
import { deepseek } from "@ai-sdk/deepseek";

export default function ImmersiveTourPage() {
  const [formData, setFormData] = useState({
    tourType: "",
    subject: "",
    targetAudience: "",
    duration: "",
    style: "",
    platform: "",
    keyHighlights: "",
    additionalNotes: "",
  });
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setOutput("");

    try {
      const { text } = await generateText({
        model: deepseek("deepseek-chat"),
        prompt: `You are an expert immersive experience designer and virtual tour director. Create a comprehensive immersive tour description based on the following specifications:

- Tour Type: ${formData.tourType}
- Subject / Location: ${formData.subject}
- Target Audience: ${formData.targetAudience}
- Tour Duration: ${formData.duration}
- Presentation Style: ${formData.style}
- Platform / Medium: ${formData.platform}
- Key Highlights to Include: ${formData.keyHighlights}
- Additional Notes: ${formData.additionalNotes}

Provide a detailed immersive tour package including:
1. Tour Overview & Narrative Arc
2. Scene-by-Scene Breakdown (with spatial descriptions)
3. Visual Journey Description (what the viewer sees at each moment)
4. Audio Landscape (narration style, music, ambient sounds)
5. Interactive Hotspots & Information Cards
6. Emotional Pacing Map (excitement peaks, quiet moments)
7.360° / Spatial Navigation Points
8. Educational Content Integration
9. Accessibility Features (audio description, subtitles, seated option)
10. Technical Specifications (resolution, frame rate, platform requirements)
11. Post-tour Experience (Q&A, discussion guide, resources)
12. Mood Board & Visual Reference

Format with clear markdown headers, scene timestamps, and rich sensory descriptions.`,
      });
      setOutput(text);
    } catch {
      setOutput("Error generating immersive tour. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 text-white p-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-lime-400 to-emerald-400 bg-clip-text text-transparent mb-3">
            Immersive Tour Description Generator
          </h1>
          <p className="text-slate-400 text-lg">
            Design immersive 360°, VR, and video tours with AI-powered scripts
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-5 text-lime-300">Tour Parameters</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-slate-300 mb-1">Tour Type</label>
                <select name="tourType" value={formData.tourType} onChange={handleChange} required
                  className="w-full bg-slate-800/60 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-lime-400 focus:outline-none">
                  <option value="">Select type...</option>
                  <option value="360° Photo Tour">360 Photo Tour (Google-style)</option>
                  <option value="Cinematic Video Tour">Cinematic Video Tour</option>
                  <option value="VR Immersive Tour">VR Immersive Tour</option>
                  <option value="Docu-Journey">Docu-Journey (narrated documentary)</option>
                  <option value="Museum / Gallery Tour">Museum / Gallery Walkthrough</option>
                  <option value="Nature / Wildlife Tour">Nature / Wildlife Tour</option>
                  <option value="Historical / Heritage Tour">Historical / Heritage Tour</option>
                  <option value="Architectural Walkthrough">Architectural Walkthrough</option>
                  <option value="Space / Planetarium Tour">Space / Planetarium Tour</option>
                  <option value="Culinary / Cultural Tour">Culinary / Cultural Tour</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-1">Subject / Location</label>
                <input type="text" name="subject" value={formData.subject} onChange={handleChange} required
                  placeholder="e.g., The ancient city of Petra, Machu Picchu, coral reef ecosystem"
                  className="w-full bg-slate-800/60 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:border-lime-400 focus:outline-none" />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-1">Target Audience</label>
                <input type="text" name="targetAudience" value={formData.targetAudience} onChange={handleChange} required
                  placeholder="e.g., School groups (ages 10-14), senior citizens, tourists"
                  className="w-full bg-slate-800/60 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:border-lime-400 focus:outline-none" />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-1">Tour Duration</label>
                <select name="duration" value={formData.duration} onChange={handleChange} required
                  className="w-full bg-slate-800/60 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-lime-400 focus:outline-none">
                  <option value="">Select duration...</option>
                  <option value="1-3 minutes">1-3 minutes (Quick Teaser)</option>
                  <option value="5-10 minutes">5-10 minutes (Short Tour)</option>
                  <option value="15-20 minutes">15-20 minutes (Standard)</option>
                  <option value="30-45 minutes">30-45 minutes (Extended)</option>
                  <option value="60+ minutes">60+ minutes (Deep Dive / Multi-scene)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-1">Presentation Style</label>
                <select name="style" value={formData.style} onChange={handleChange} required
                  className="w-full bg-slate-800/60 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-lime-400 focus:outline-none">
                  <option value="">Select style...</option>
                  <option value="Documentary / Informative">Documentary / Informative</option>
                  <option value="Cinematic / Emotional">Cinematic / Emotional</option>
                  <option value="Adventure / Action-packed">Adventure / Action-packed</option>
                  <option value="Serene / Meditative">Serene / Meditative</option>
                  <option value="Educational / Academic">Educational / Academic</option>
                  <option value="Storytelling / Narrative-driven">Storytelling / Narrative-driven</option>
                  <option value="Interactive / Choose-your-path">Interactive / Choose-your-path</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-1">Platform / Medium</label>
                <select name="platform" value={formData.platform} onChange={handleChange} required
                  className="w-full bg-slate-800/60 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-lime-400 focus:outline-none">
                  <option value="">Select platform...</option>
                  <option value="VR Headset (Quest, Vision Pro)">VR Headset (Quest, Vision Pro)</option>
                  <option value="360 YouTube / Vimeo">360 Video (YouTube, Vimeo)</option>
                  <option value="Matterport / 3D Scan">Matterport / 3D Scan Platform</option>
                  <option value="Web-based Interactive">Web-based Interactive (desktop/mobile)</option>
                  <option value="Projection Mapping">Projection Mapping / Planetarium</option>
                  <option value="AR Mobile App">AR Mobile App</option>
                  <option value="Multi-platform">Multi-platform</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-1">Key Highlights</label>
                <input type="text" name="keyHighlights" value={formData.keyHighlights} onChange={handleChange} required
                  placeholder="e.g., Main square, cathedral, marketplace, hidden alley"
                  className="w-full bg-slate-800/60 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:border-lime-400 focus:outline-none" />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-1">Additional Notes</label>
                <textarea name="additionalNotes" value={formData.additionalNotes} onChange={handleChange} rows={3}
                  placeholder="Cultural sensitivities, must-include facts, music preferences..."
                  className="w-full bg-slate-800/60 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:border-lime-400 focus:outline-none resize-none" />
              </div>

              <button type="submit" disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-lime-500 to-emerald-500 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-50">
                {loading ? "Generating..." : "Generate Tour"}
              </button>
            </form>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-5 text-emerald-300">Generated Tour</h2>
            <div className="bg-slate-900/70 rounded-xl p-4 min-h-[500px] max-h-[600px] overflow-y-auto">
              {output ? (
                <div className="prose prose-invert prose-sm max-w-none whitespace-pre-wrap">
                  {output.split("\n").map((line, i) => {
                    if (line.startsWith("# ")) return <h1 key={i} className="text-xl font-bold text-lime-300 mt-4 mb-2">{line.slice(2)}</h1>;
                    if (line.startsWith("## ")) return <h2 key={i} className="text-lg font-semibold text-emerald-300 mt-3 mb-2">{line.slice(3)}</h2>;
                    if (line.startsWith("### ")) return <h3 key={i} className="text-md font-semibold text-white mt-2 mb-1">{line.slice(4)}</h3>;
                    if (line.startsWith("- ")) return <li key={i} className="text-slate-300 ml-4">{line.slice(2)}</li>;
                    if (line.trim() === "") return <br key={i} />;
                    return <p key={i} className="text-slate-300">{line}</p>;
                  })}
                </div>
              ) : (
                <p className="text-slate-500 italic">Your immersive tour description will appear here...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
