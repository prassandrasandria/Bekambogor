/**
 * WebMCP (Web Model Context Protocol) Registration
 * Standardizes browser-level tool calling for autonomous AI agents and crawler bots.
 */

import { calculateTransportCost, servicePackages, THERAPIST_INFO } from '../data/treatments';

export function initializeWebMcp() {
  if (typeof window === 'undefined') return;

  // Declare machine-readable tools for AI agents
  const cuppingTools = [
    {
      name: 'calculateTransportCost',
      description: 'Menghitung estimasi biaya transport bekam panggilan dari Kp. Leuwisadeng ke lokasi pasien (Rp 2.500/km PP).',
      parameters: {
        type: 'object',
        properties: {
          distanceKm: { type: 'number', description: 'Jarak tempuh satu arah dalam km (1-50 km)' },
          serviceType: { type: 'string', enum: ['panggilan', 'ke_rumah_terapis'], description: 'Tipe layanan' }
        },
        required: ['distanceKm', 'serviceType']
      },
      execute: async (args: { distanceKm: number; serviceType: 'panggilan' | 'ke_rumah_terapis' }) => {
        const cost = calculateTransportCost(args.distanceKm, args.serviceType);
        return {
          serviceType: args.serviceType,
          distanceKm: args.distanceKm,
          transportCost: cost,
          costFormatted: `Rp ${cost.toLocaleString('id-ID')}`,
          rate: args.serviceType === 'panggilan' ? 'Rp 2.500 / km (Pulang Pergi)' : 'Gratis (Rp 0)'
        };
      }
    },
    {
      name: 'getTreatmentPackages',
      description: 'Mendapatkan daftar lengkap paket terapi bekam resmi beserta harga, durasi, dan jumlah titik.',
      parameters: {
        type: 'object',
        properties: {}
      },
      execute: async () => {
        return {
          clinic: THERAPIST_INFO.name,
          therapist: THERAPIST_INFO.therapistName,
          formalName: THERAPIST_INFO.formalName,
          experience: THERAPIST_INFO.experienceYears,
          address: THERAPIST_INFO.address,
          whatsapp: THERAPIST_INFO.phone,
          packages: servicePackages.map(pkg => ({
            id: pkg.id,
            name: pkg.name,
            price: pkg.price,
            priceFormatted: `Rp ${pkg.price.toLocaleString('id-ID')}`,
            cupCount: pkg.cupCount,
            durationMinutes: pkg.durationMinutes,
            tagline: pkg.tagline
          }))
        };
      }
    }
  ];

  // Expose WebMCP standard interface on window and navigator if present
  try {
    const nav = navigator as unknown as { modelContext?: { registerTool?: (tool: unknown) => void } };
    if (nav.modelContext && typeof nav.modelContext.registerTool === 'function') {
      cuppingTools.forEach(tool => {
        nav.modelContext?.registerTool?.(tool);
      });
    }

    // Also attach to window.__WEBMCP__ for audit crawlers
    (window as unknown as { __WEBMCP__?: typeof cuppingTools }).__WEBMCP__ = cuppingTools;
  } catch (err) {
    console.debug('WebMCP init notice:', err);
  }
}
