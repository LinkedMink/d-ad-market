# DAdMarket White Paper

## Motivations

TODO

## Entities

- Broker Pool: A distributed set of nodes with their own private key. They will verify that each broker in the pool's ad logs correspond to slot holder logs and take a cut from the advertisers as a reward for facilitation.

## Phases

### Phase 1 - POC Static Ads and Verification

- Transact at a fixed rate for a predefined ad slot (tokens)
  - Allow sale of initial slots from holders to advertisers
    - Rate for views
    - Rate for clicks
  - Allow exchange of slots between advertisers
  - Allow recall/removal of ad slot back to holder
- Verify view count and click through rate by cryptographic signature
  - Slot holder registers a slot with a broker
    - Broker serves a signed dummy image with a fixed URL (maybe auto-gen from holder pub key)
    - Slot holder embeds image in slot via prebuilt web component
    - Broker verifies slot ownership (URL, slot size, etc.)
  - An ad is served by the broker in an ad slot
    - Web component originates from slot holder domain
      - An API endpoint signs image queries
      - An API endpoint serves log entries of recent (since last consolidation) signed queries
    - Web component retrieves image by GET request with a signed query param (datetime, origin IP, maybe others)
    - Each time a broker serves an image they attach a signed header (datetime, origin IP, maybe others) to the response
      - Both the holder and broker signatures are logged
  - A user clicks an ad
    - A click goes to a URL in the brokers domain with signed query params from slot holder
    - ... similar to serving images
    - Except, don't return an image. Lookup the advertiser that owns the slot token and redirect the user to the advertisers URL with a signed header.
  - Broker pool consolidates stats and verification
    - Periodically contact the slot holder logs to get recent views
    - Check with the shared pools log. Only agreed upon clicks and views from all entities. Protect from:
      - Incomplete loads (Slot holder has view entry, but broker doesn't)
      - Single broker falsifying records
      - Advertiser falsifying records
      - TODO: How to verify click through? A broker pool and slot holder can verify a click, but the advertiser could claim the user never arrived. This might not be a problem if we say a click should be counted in this case. It's the advertiser's responsibility for their token to link correctly.
    - Write to shared DB for audit, and clear local copy
    - All entities can verify a view and click rate

### Phase 2 - Organize and Target

- Organize ad slots
  - Categorize by content space type (news, technology, entertainment, etc.)
  - Demographics
  - Geographic regions
    - By IP geolocation
    - By likely target region based on prior request
- Allow sale of dynamically generated slots (opt-in)

### Phase 3 - Dynamic Rates

- Use stats for dynamic rate negotiation
  - Higher views increases slot rate
- Allow advertiser to select categories, regions, demographics, and rates
  - Provide ranges and probabilistic slots for criteria
    - High to low tolerance for mismatch
  - Auto buy and sell slot tokens by criteria
    - Negotiate quicker or slower slot transfers by tolerance

### Phase 4 - Dynamic Content

- Support dynamic content (video, etc.)

### Phase 5 - Quality of Life (Expansive Ongoing Development)

- Advertiser Interfaces
  - Ad Effectiveness UI
    - Performance tracking (view vs. click rate)
    - Demographics
    - Regions
  - Cost and Management UI
    - Cost predictions based on criteria
    - Historic cost vs. effectiveness
- Broker Management
  - Tools to automatically join and setup broker pools
- Ad Slot Holder Interfaces
  - Plugins for popular CMS
  - Negotiate with popular platforms
  - Pre-built self-contained components
  - Public interface and broker registries for custom integrations
