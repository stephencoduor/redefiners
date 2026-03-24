# Canvas LMS BrandConfig Seed Script — ReDefiners Theme
#
# Usage: Run via Rails console or as a seed file:
#   rails runner ReDefiners/canvas_brand_config.rb
#
# This script creates a BrandConfig with the ReDefiners "Dark Accent"
# teal/green theme and applies it to the root account.

redefiners_variables = {
  # ── Global Branding ──
  'ic-brand-primary'              => '#2DB88A',   # accent green
  'ic-brand-font-color-dark'      => '#1B1B1B',   # text-primary
  'ic-link-color'                 => '#3B82F6',   # text-link (blue)
  'ic-brand-button--primary-bgd'  => '#163B32',   # primary-800 (dark teal)
  'ic-brand-button--primary-text' => '#FFFFFF',
  'ic-brand-button--secondary-bgd'  => '#FF6B35', # accent orange (CTA)
  'ic-brand-button--secondary-text' => '#FFFFFF',

  # ── Global Navigation ──
  'ic-brand-global-nav-bgd'                          => '#0F2922',   # primary-900
  'ic-brand-global-nav-ic-icon-svg-fill'             => '#7CB5A4',   # primary-200
  'ic-brand-global-nav-ic-icon-svg-fill--active'     => '#2DB88A',   # accent green
  'ic-brand-global-nav-menu-item__text-color'        => 'rgba(255,255,255,0.75)',
  'ic-brand-global-nav-menu-item__text-color--active' => '#FFFFFF',
  'ic-brand-global-nav-avatar-border'                => '#2DB88A',
  'ic-brand-global-nav-menu-item__badge-bgd'         => '#FF6B35',   # orange badge
  'ic-brand-global-nav-menu-item__badge-bgd--active'  => '#2DB88A',
  'ic-brand-global-nav-menu-item__badge-text'        => '#FFFFFF',
  'ic-brand-global-nav-menu-item__badge-text--active' => '#FFFFFF',
  'ic-brand-global-nav-logo-bgd'                     => '#163B32',   # primary-800

  # ── Login Page ──
  'ic-brand-Login-body-bgd-color'                => '#0F2922',   # primary-900
  'ic-brand-Login-body-bgd-shadow-color'         => '#0A1F1A',   # darker shade
  'ic-brand-Login-Content-bgd-color'             => '#FFFFFF',
  'ic-brand-Login-Content-border-color'          => '#E5E7EB',   # neutral-200
  'ic-brand-Login-Content-inner-bgd'             => '#FFFFFF',
  'ic-brand-Login-Content-inner-border'          => '#E5E7EB',
  'ic-brand-Login-Content-inner-body-bgd'        => '#FFFFFF',
  'ic-brand-Login-Content-inner-body-border'     => '#E5E7EB',
  'ic-brand-Login-Content-label-text-color'      => '#1B1B1B',   # text-primary
  'ic-brand-Login-Content-password-text-color'   => '#3B82F6',   # text-link
  'ic-brand-Login-footer-link-color'             => '#7CB5A4',   # primary-200
  'ic-brand-Login-footer-link-color-hover'       => '#FFFFFF',
  'ic-brand-Login-instructure-logo'              => '#7CB5A4',   # subtle teal

  # ── Watermarks / Tiles ──
  'ic-brand-msapplication-tile-color' => '#2DB88A',
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
