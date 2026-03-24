# Canvas LMS BrandConfig Seed Script — ReDefiners Theme
#
# Usage: Run via Rails console or as a seed file:
#   rails runner ReDefiners/canvas_brand_config.rb
#
# This script creates a BrandConfig with the ReDefiners "Dark Accent"
# teal/green theme and applies it to the root account.

redefiners_variables = {
  # ── Global Branding ──
  'ic-brand-primary'              => '#38AA51',   # accent green
  'ic-brand-font-color-dark'      => '#00303F',   # text-primary
  'ic-link-color'                 => '#2989CA',   # text-link (blue)
  'ic-brand-button--primary-bgd'  => '#063949',   # primary-800 (dark teal)
  'ic-brand-button--primary-text' => '#FFFFFF',
  'ic-brand-button--secondary-bgd'  => '#F49E21', # accent orange (CTA)
  'ic-brand-button--secondary-text' => '#FFFFFF',

  # ── Global Navigation ──
  'ic-brand-global-nav-bgd'                          => '#00303F',   # primary-900
  'ic-brand-global-nav-ic-icon-svg-fill'             => '#8CA7AF',   # primary-200
  'ic-brand-global-nav-ic-icon-svg-fill--active'     => '#38AA51',   # accent green
  'ic-brand-global-nav-menu-item__text-color'        => 'rgba(255,255,255,0.75)',
  'ic-brand-global-nav-menu-item__text-color--active' => '#FFFFFF',
  'ic-brand-global-nav-avatar-border'                => '#38AA51',
  'ic-brand-global-nav-menu-item__badge-bgd'         => '#F49E21',   # orange badge
  'ic-brand-global-nav-menu-item__badge-bgd--active'  => '#38AA51',
  'ic-brand-global-nav-menu-item__badge-text'        => '#FFFFFF',
  'ic-brand-global-nav-menu-item__badge-text--active' => '#FFFFFF',
  'ic-brand-global-nav-logo-bgd'                     => '#063949',   # primary-800

  # ── Login Page ──
  'ic-brand-Login-body-bgd-color'                => '#00303F',   # primary-900
  'ic-brand-Login-body-bgd-shadow-color'         => '#0A1F1A',   # darker shade
  'ic-brand-Login-Content-bgd-color'             => '#FFFFFF',
  'ic-brand-Login-Content-border-color'          => '#E9F2F4',   # neutral-200
  'ic-brand-Login-Content-inner-bgd'             => '#FFFFFF',
  'ic-brand-Login-Content-inner-border'          => '#E9F2F4',
  'ic-brand-Login-Content-inner-body-bgd'        => '#FFFFFF',
  'ic-brand-Login-Content-inner-body-border'     => '#E9F2F4',
  'ic-brand-Login-Content-label-text-color'      => '#00303F',   # text-primary
  'ic-brand-Login-Content-password-text-color'   => '#2989CA',   # text-link
  'ic-brand-Login-footer-link-color'             => '#8CA7AF',   # primary-200
  'ic-brand-Login-footer-link-color-hover'       => '#FFFFFF',
  'ic-brand-Login-instructure-logo'              => '#8CA7AF',   # subtle teal

  # ── Watermarks / Tiles ──
  'ic-brand-msapplication-tile-color' => '#38AA51',
}

# Create or find the BrandConfig
brand_config = BrandConfig.for(variables: redefiners_variables)
brand_config.save! unless brand_config.persisted?

# Apply to root account
account = Account.default
account.brand_config = brand_config
account.save!

puts "ReDefiners theme applied successfully!"
puts "  BrandConfig MD5: #{brand_config.md5}"
puts "  Account: #{account.name} (ID: #{account.id})"
puts ""
puts "Next steps:"
puts "  1. Upload logo images via Theme Editor at /accounts/#{account.id}/brand_configs"
puts "  2. Upload redefiners_overrides.css as the CSS override file"
puts "  3. Upload redefiners_instui.js as the JS override file"
puts "  4. Run: rake brand_configs:generate_and_upload_all"
