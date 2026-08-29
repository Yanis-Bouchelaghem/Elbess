# Features

## Auth
- Sign up (name, email, password) — no email verification
- Login -> land on listings feed
- Logout

## Feed
- Listings feed, newest first: cover photo, title, price, condition tag
- Search bar + category chips
- Filters sheet: category, condition (multi-select), price range — apply / reset
- Shared empty / loading skeleton / error states, reused on every list screen

## Listing
- Detail page: photo carousel, title, price, condition + status badges, description, seller row
- Reserved/Sold listings are visibly unavailable and hide the offer actions
- Create a listing: 3 steps — photos (1+, reorderable, first = cover) -> details -> review & publish
- My Listings: Active / Reserved / Sold tabs, with edit, mark as sold, delete
- Seller profile: avatar, name, count for sale, their listings (Active + Reserved)

## Buying = making an offer
- "Buy now" sends an offer at the asking price
- "Make an offer" opens a sheet: price (pre-filled, editable down) + optional message
- Seller can Accept / Counter / Decline
- Accepting reserves the listing and posts a system message — this is the end state.
  No payment, checkout or shipping in the app

## Chat
- Inbox: conversations with listing thumbnail, name, last message/offer preview,
  timestamp, unread indicator, status tag ("Offer pending", "Offer accepted")
- Conversation: text bubbles, distinct offer cards with Accept / Counter / Decline,
  system messages for state changes
- Unread badge on the Inbox tab
- Live updates: polling first, then SSE
- Push notifications when the app is backgrounded

## Profile
- Avatar, name, entry to My Listings, logout
- Edit profile: avatar + name

## Out of scope
Payments, checkout, shipping, ratings/reviews, password reset, email verification,
notification settings.
