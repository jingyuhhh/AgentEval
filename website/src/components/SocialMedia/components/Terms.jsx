// TermsContent.jsx
import React from "react";

const Section = ({ title, children }) => (
  <div className="mb-4">
    <h3 className="font-semibold text-lg mb-1">{title}</h3>
    <div className="text-sm text-gray-700 space-y-1">{children}</div>
  </div>
);

const Terms = ({ extraClause }) => {
  return (
    <div className="text-[14px] leading-5">
      <h2 className="text-center text-xl font-bold mb-1">
        Terms and Conditions for Subscribing to Our Content
      </h2>
      <p className="text-center italic mb-4">Last Updated: July 29, 2025</p>
      <p>
        These Terms and Conditions govern your subscription to this content
        creator. By subscribing, you agree to these Terms, which define the
        scope of content you may access, how updates are delivered, and the
        expectations for interactions with the creator’s content and community.
      </p>
      <Section title="Purpose of the Subscription">
        <p>
          The subscription gives you access to exclusive content, updates, and
          insights shared by the creator. This may include behind-the-scenes
          content, early access to posts or projects, special announcements, or
          other exclusive materials intended for subscribers only.
        </p>
      </Section>
      <Section title="Eligibility">
        <ul className="list-disc pl-5 space-y-1">
          <li>
            You must have an active account on the platform where this creator’s
            content is hosted.
          </li>
          <li>
            You must be of legal age to use this service in your jurisdiction.
          </li>
          <li>
            The subscription is intended for personal, non-commercial use only.
          </li>
        </ul>
      </Section>
      <Section title="What You Can Expect from the Creator">
        <ul className="list-disc pl-5 space-y-1">
          <li>
            Regular updates, posts, or content releases as described in the
            subscription offering.
          </li>
          <li>
            Efforts to ensure that shared content is original, relevant, and of
            value to subscribers.
          </li>
          <li>
            Respect for your privacy; no personal information will be requested
            beyond what is required by the platform.
          </li>
        </ul>
      </Section>
      <Section title="Your Responsibilities as a Subscriber">
        <p>By subscribing, you agree to:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            Use subscription content only for personal purposes and not
            redistribute, reproduce, or share it without permission from the
            creator.
          </li>
          <li>
            Refrain from abusive, unlawful, or disruptive behavior toward the
            creator or other members.
          </li>
          <li>
            Respect any intellectual property rights associated with the
            creator’s content.
          </li>
          {extraClause && <li>{extraClause}</li>}
        </ul>
      </Section>
      <Section title="Limitations">
        <p>
          While the creator strives to provide consistent and high-quality
          content, they do not guarantee uninterrupted availability, error-free
          materials, or a specific posting schedule.
        </p>
      </Section>
      <Section title="Cancellation">
        <p>
          You may unsubscribe at any time through your account settings on the
          platform. Once you unsubscribe, you will lose access to
          subscriber-only content and updates.
        </p>
      </Section>
      <Section title="Changes to These Terms">
        <p>
          These Terms may be updated periodically to reflect changes in
          offerings or platform policies. Continued subscription after such
          updates constitutes acceptance of the revised Terms.
        </p>
      </Section>
      <Section title="Contact Information">
        <p>For questions or concerns about these Terms, please contact:</p>
        <p>
          Creator Support Team <br />
          Email: support@creatorhub.com <br />
          Phone: +1-800-123-4567
        </p>
      </Section>
    </div>
  );
};

export default Terms;
