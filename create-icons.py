#!/usr/bin/env python3
"""
Icon generation script for TimestampConverter
Requires: pip install Pillow cairosvg
"""

import os
from PIL import Image, ImageDraw, ImageFont
import cairosvg
import io

def create_directory(path):
    """Create directory if it doesn't exist"""
    os.makedirs(path, exist_ok=True)

def create_simple_icon(size, bg_color="#3b82f6", text_color="#ffffff"):
    """Create a simple timestamp icon"""
    img = Image.new('RGBA', (size, size), bg_color)
    draw = ImageDraw.Draw(img)
    
    # Draw rounded rectangle background
    margin = size // 8
    rect_coords = [margin, margin + size//4, size - margin, size - margin//2]
    draw.rounded_rectangle(rect_coords, fill="#ffffff", outline="#1e40af", width=2, radius=size//16)
    
    # Add text
    try:
        # Try to use a monospace font
        font_size = size // 4
        font = ImageFont.truetype("Courier", font_size)
    except:
        # Fallback to default font
        font_size = size // 6
        font = ImageFont.load_default()
    
    # Draw timestamp text
    text = "123"
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    text_x = (size - text_width) // 2
    text_y = (size - text_height) // 2 + size // 8
    
    draw.text((text_x, text_y), text, fill="#1e40af", font=font)
    
    # Add a small check mark
    check_size = size // 6
    check_x = size - check_size - margin
    check_y = margin
    
    draw.ellipse([check_x, check_y, check_x + check_size, check_y + check_size], fill="#10b981")
    
    # Draw check mark
    check_points = [
        (check_x + check_size//4, check_y + check_size//2),
        (check_x + check_size//2, check_y + 3*check_size//4),
        (check_x + 3*check_size//4, check_y + check_size//4)
    ]
    draw.line(check_points[:2], fill="#ffffff", width=2)
    draw.line(check_points[1:], fill="#ffffff", width=2)
    
    return img

def create_og_image(width=1200, height=630):
    """Create Open Graph image for social sharing"""
    img = Image.new('RGB', (width, height), '#f8fafc')
    draw = ImageDraw.Draw(img)
    
    # Background gradient simulation
    for i in range(height):
        alpha = int(255 * (1 - i / height * 0.3))
        color = f"#{hex(alpha)[2:].zfill(2)}b3f6"
        if len(color) == 7:  # Valid hex color
            draw.line([(0, i), (width, i)], fill="#3b82f6", width=1)
    
    # Title
    try:
        title_font = ImageFont.truetype("Arial", 72)
        subtitle_font = ImageFont.truetype("Arial", 36)
    except:
        title_font = ImageFont.load_default()
        subtitle_font = ImageFont.load_default()
    
    title = "TimestampConverter"
    subtitle = "Professional Unix Time Converter for Developers"
    
    # Calculate text positions
    title_bbox = draw.textbbox((0, 0), title, font=title_font)
    title_width = title_bbox[2] - title_bbox[0]
    title_height = title_bbox[3] - title_bbox[1]
    
    subtitle_bbox = draw.textbbox((0, 0), subtitle, font=subtitle_font)
    subtitle_width = subtitle_bbox[2] - subtitle_bbox[0]
    
    title_x = (width - title_width) // 2
    title_y = height // 3
    
    subtitle_x = (width - subtitle_width) // 2
    subtitle_y = title_y + title_height + 30
    
    # Draw text with shadow
    shadow_offset = 3
    draw.text((title_x + shadow_offset, title_y + shadow_offset), title, fill="#1e293b", font=title_font)
    draw.text((title_x, title_y), title, fill="#ffffff", font=title_font)
    
    draw.text((subtitle_x + shadow_offset, subtitle_y + shadow_offset), subtitle, fill="#1e293b", font=subtitle_font)
    draw.text((subtitle_x, subtitle_y), subtitle, fill="#ffffff", font=subtitle_font)
    
    # Add some decorative elements
    # Draw timestamp boxes
    box_width = 200
    box_height = 80
    
    boxes_data = [
        (150, height - 200, "1735509600", "2025-01-01"),
        (width - 350, height - 200, "1640995200", "2022-01-01"),
        (width // 2 - 100, height - 150, "Now", "Real-time")
    ]
    
    try:
        mono_font = ImageFont.truetype("Courier", 18)
    except:
        mono_font = ImageFont.load_default()
    
    for x, y, timestamp, date in boxes_data:
        # Box background
        draw.rounded_rectangle([x, y, x + box_width, y + box_height], 
                             fill="#ffffff", outline="#3b82f6", width=2, radius=8)
        
        # Timestamp
        draw.text((x + 10, y + 15), timestamp, fill="#1e40af", font=mono_font)
        # Date
        draw.text((x + 10, y + 45), date, fill="#64748b", font=mono_font)
    
    return img

def main():
    """Generate all required icons and images"""
    public_dir = "/Users/guoshuaihao/Documents/Learning/06-学习资料/哥飞课程/timestamp-converter/public"
    icons_dir = os.path.join(public_dir, "icons")
    
    # Create directories
    create_directory(icons_dir)
    
    # PWA Icon sizes
    sizes = [72, 96, 128, 144, 152, 192, 384, 512]
    
    print("Creating PWA icons...")
    for size in sizes:
        icon = create_simple_icon(size)
        icon_path = os.path.join(icons_dir, f"icon-{size}x{size}.png")
        icon.save(icon_path, "PNG")
        print(f"✓ Created {icon_path}")
    
    # Apple touch icon (180x180)
    print("Creating Apple touch icon...")
    apple_icon = create_simple_icon(180)
    apple_icon.save(os.path.join(public_dir, "apple-touch-icon.png"), "PNG")
    print("✓ Created apple-touch-icon.png")
    
    # Favicon (32x32)
    print("Creating favicon...")
    favicon = create_simple_icon(32)
    favicon.save(os.path.join(public_dir, "favicon.ico"), "ICO")
    print("✓ Created favicon.ico")
    
    # Shortcut icons (96x96)
    print("Creating shortcut icons...")
    shortcut_names = ["converter", "batch", "code"]
    for name in shortcut_names:
        shortcut_icon = create_simple_icon(96)
        shortcut_path = os.path.join(icons_dir, f"shortcut-{name}.png")
        shortcut_icon.save(shortcut_path, "PNG")
        print(f"✓ Created {shortcut_path}")
    
    # Open Graph images
    print("Creating Open Graph images...")
    og_image = create_og_image()
    og_image.save(os.path.join(public_dir, "og-image.png"), "PNG")
    print("✓ Created og-image.png")
    
    # Twitter image (same as OG)
    og_image.save(os.path.join(public_dir, "twitter-image.png"), "PNG")
    print("✓ Created twitter-image.png")
    
    # Page-specific OG images
    pages = [
        ("timestamp-converter", "Timestamp Converter - Convert Unix timestamps instantly"),
        ("unix-timestamp-converter", "Unix Timestamp Converter - Professional developer tool"), 
        ("timestamp-to-date", "Timestamp to Date - Convert timestamps to human-readable dates")
    ]
    
    for page_name, title in pages:
        page_og = create_og_image()
        # You can customize each page's OG image here if needed
        page_og.save(os.path.join(public_dir, f"{page_name}-og.png"), "PNG")
        page_og.save(os.path.join(public_dir, f"{page_name}-twitter.png"), "PNG")
        print(f"✓ Created {page_name} social images")
    
    print("\n🎉 All icons and images created successfully!")
    print("\nNext steps:")
    print("1. Run this script: python3 create-icons.py")
    print("2. Review generated images")
    print("3. Customize colors/design if needed")
    print("4. Test PWA functionality")

if __name__ == "__main__":
    main()