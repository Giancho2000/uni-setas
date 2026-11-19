import { activities } from '../data/activities';
import { project } from '../data/project';
import { sdgLevels, sdgs } from '../data/sdg';
import type { Activity, Sdg, SdgFilterValue, SdgLevelInfo, SuccessIndicator } from '../types';

export interface SdgGroup {
  level: SdgLevelInfo;
  items: Sdg[];
}

export interface ActivitySdgRow {
  activity: Activity;
  sdgs: Sdg[];
}

const byId = (a: Sdg, b: Sdg) => a.id - b.id;

/** SDGs grouped by level (directa → complementaria → indirecta), sorted by id inside each group. */
export function getSdgsByLevel(filter: SdgFilterValue, list: Sdg[] = sdgs): SdgGroup[] {
  return sdgLevels
    .filter((level) => filter === 'todos' || level.id === filter)
    .map((level) => ({
      level,
      items: list.filter((sdg) => sdg.level === level.id).sort(byId),
    }))
    .filter((group) => group.items.length > 0);
}

/**
 * One row per activity (sorted by week) with the SDGs it supports.
 * Derived by inverting `Sdg.activityIds`, so the table and the modals can never disagree.
 */
export function getActivitySdgRows(list: Sdg[] = sdgs): ActivitySdgRow[] {
  return [...activities]
    .sort((a, b) => a.week - b.week)
    .map((activity) => ({
      activity,
      sdgs: list.filter((sdg) => sdg.activityIds.includes(activity.id)).sort(byId),
    }));
}

/** Activities that support an SDG, in the order of its `activityIds`. Throws on unknown ids. */
export function resolveSdgActivities(sdg: Sdg): Activity[] {
  return sdg.activityIds.map((id) => {
    const activity = activities.find((item) => item.id === id);
    if (!activity) throw new Error(`[sdg] Unknown activity id "${id}" in ODS ${sdg.id}.`);
    return activity;
  });
}

/** Success indicators that evidence an SDG, in the order of its `indicatorIds`. Throws on unknown ids. */
export function resolveSdgIndicators(sdg: Sdg): SuccessIndicator[] {
  return sdg.indicatorIds.map((id) => {
    const indicator = project.indicators.find((item) => item.id === id);
    if (!indicator) throw new Error(`[sdg] Unknown indicator id "${id}" in ODS ${sdg.id}.`);
    return indicator;
  });
}
