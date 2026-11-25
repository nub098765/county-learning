/* Shared state-badge art: the round medal with the tier ring and the state's own shape.
   Used by profile.js (the badge shelf) and by the unlock toasts on the game page, so both draw the same badge.
   Needs the outline files us-map.js, dc-shape.js and as-shape.js; CountellectBadge.ready() loads them if the page didn't. */
(function () {
  "use strict";
  const SVGNS = "http://www.w3.org/2000/svg";
  const MODE_COUNT = 6;
  const svgEl = (tag, attrs) => { const n = document.createElementNS(SVGNS, tag); for (const k in attrs) n.setAttribute(k, attrs[k]); return n; };

  const TIER = n => n >= MODE_COUNT ? "gold" : n >= 3 ? "silver" : n >= 1 ? "bronze" : "locked";
  const TIER_RING = { gold: "#d4a017", silver: "#b8c0cc", bronze: "#b0703c", locked: "rgba(128,128,128,.55)" };

  // each state's colours from the points sheet: [background, text]
  const STATE_STYLE = {"Alabama":["00491C","D9EAD3"],"Alaska":["6DFEFE","674EA7"],"American Samoa":["767576","E6CCE6"],"Arizona":["8A9CC6","E3E9FC"],"Arkansas":["BEC86F","990000"],"California":["FB85FD","351C75"],"Colorado":["00856D","D0E0E3"],"Connecticut":["FFC0C1","4C1130"],"Delaware":["0000A1","FFE599"],"District of Columbia":["670011","9FC5E8"],"Florida":["E4F73A","38761D"],"Georgia":["FF553D","FFF8ED"],"Guam":["5050F5","C9DAF8"],"Hawaii":["4FEEA5","674EA7"],"Idaho":["F7CE00","7F6000"],"Illinois":["FFF281","1155CC"],"Indiana":["D4AA77","990000"],"Iowa":["E7FFA9","7F6000"],"Kansas":["B0E8B5","85200C"],"Kentucky":["1897B4","CFE2F3"],"Louisiana":["803499","EAD1DC"],"Maine":["FB9163","FFF2CC"],"Maryland":["FC2E5B","FFF2CC"],"Massachusetts":["CD70FF","F0D4FF"],"Michigan":["95DF15","274E13"],"Minnesota":["FFC294","434343"],"Mississippi":["7F0E54","D5A6BD"],"Missouri":["17C5E4","0000A1"],"Montana":["C6DBE8","A61C00"],"Nebraska":["C11A36","CFE2F3"],"Nevada":["FFE7BC","666666"],"New Hampshire":["FF3DA8","420027"],"New Jersey":["5D4033","F9CB9C"],"New Mexico":["F1AB13","990000"],"New York":["FF8181","783F04"],"North Carolina":["006597","F4CCCC"],"North Dakota":["6C5BCA","FFE599"],"Northern Mariana Islands":["44FF00","7F6000"],"Ohio":["FFA33B","FFF2CC"],"Oklahoma":["A15F39","F4CCCC"],"Oregon":["BD6E63","FCD7D0"],"Pennsylvania":["D6C040","1C4587"],"Puerto Rico":["FBD573","CC0000"],"Rhode Island":["008A28","CFE2F3"],"South Carolina":["68CAD5","134F5C"],"South Dakota":["87CAF3","1155CC"],"Tennessee":["F05400","FCE5CD"],"Texas":["798830","FFF2CC"],"United States Minor Outlying Islands":["C3C3C3","666666"],"United States Virgin Islands":["C62FD0","EAD1DC"],"Utah":["F0781D","FFDBB7"],"Vermont":["0089F1","D9EAD3"],"Virginia":["B390DB","EFE8FF"],"Washington":["87B9A3","1C4587"],"West Virginia":["355850","FCE5CD"],"Wisconsin":["E9BAF5","741B47"],"Wyoming":["8C607E","FCE5CD"]};

  // American Samoa is drawn as islands far apart, so its badge shows just Tutuila (plus little Aunu'u beside it).
  // The rule keeps only shapes that sit left of x = 750 on the map, which is Tutuila; Manu'a, Swains and Rose are farther right.
  const BADGE_ONLY = {
    "American Samoa": shape => {
      const nums = shape.match(/-?\d+\.?\d*/g).map(Number);
      let maxX = -Infinity;
      for (let i = 0; i < nums.length; i += 2) maxX = Math.max(maxX, nums[i]);
      return maxX < 750;
    }
  };

  // The U.S. Minor Outlying Islands are nine specks scattered over the Pacific (and one in the Caribbean), so their badge
  // is the globe from the game's UM map instead of an outline: faint continents, and each island as a magnified shape in a
  // bubble at its real spot (Kingman/Palmyra and Howland/Baker share a pill, north island on top, like the game map).
  // Coordinates are on the medal's 100x100 grid; the globe is a circle of radius 38 centred on (50, 50). Island outlines are
  // relative to their bubble's centre. Redo the extraction from maps/svg-united-states-minor-outlying-islands.js if that map's layout changes.
  const GLOBE_BADGES = {
    "United States Minor Outlying Islands": {
      land: "M53.4 15.6l0.6 0.5 1.2 0.2 -0.3 -0.3 0.2 0.1 0 -0.3zM53.7 14.8l0.4 0.1 -0.4 0.2 0.5 0 -0.6 0 0.2 0.1 -0.3 0.2 1 0.2 0.2 -0.2 -0.1 -0.2 0.3 0.1 -0.2 0.3 0.6 0.1 -0.8 0 1 0.1 0.2 0.2 -0.5 0 0.2 0.2 0.1 -0.2 0.4 0.3 0.1 -0.1 0.1 0.2 -0.6 -0.1 0.3 0.4 1.3 -0.2 -0.3 -0.3 -0.6 0 0.4 0 -0.3 -0.2 0.2 -0.1 -0.9 -0.2 0.2 -0.3 -1 -0.8zM54.9 16.8l1.5 0.6 1.4 -0.4 -0.5 -0.3 -0.9 0.4zM53.2 17.1l0.4 0.5 -1.2 -0.3 -0.1 0.2 0.3 0 -0.4 0.1 0.4 0 -0.4 0.2 1.1 -0.1 -0.4 0.2 0.2 0.1 1 -0.3 -0.1 -0.3zM55.9 17.8l-0.6 0.1 0.4 0.3 -0.4 0.2 1.3 0.4 0.1 -0.3 -0.7 -0.3zM51.6 18.1l-0.5 0.1 0.2 0.2 -0.2 0.6 0.6 0.4 0.5 -0.2 0 -0.3 0.7 -0.5zM53.1 18.4l-0.6 0.4 0 0.3 0.7 0 -0.5 0.3 1.5 0.1 -1.1 0.2 0.3 0.3 0.6 0 0.3 0.3 0.9 -0.2 0.3 -0.4 1.1 0 -0.5 -0.2 0.5 0 -0.2 -0.2 -0.7 -0.2 -1 -0.8 -0.5 0 0.5 0.6 -0.6 -0.4 -0.2 0.2 -0.4 -0.2 -0.3 0.2zM39.7 18.9l-1.8 1.4 0.9 -0.4 -0.4 0.3 0.4 0.2 -0.1 0.2 0.2 0.4 0.7 -0.5 0.3 0.2 0.5 -0.2 -0.4 -0.6 -0.5 0.3 0.4 -0.6zM61.1 20.2l0.6 1 0.3 -0.1 0.3 0.2 0 -0.6 0.7 0.2zM54.2 13.9l0.5 0.1 -0.2 0.1 0.1 0.1 1 0.1 -0.7 0 0.6 0.3 -0.5 0 1.5 0.7 -0.1 0.4 0.3 0.1 0.6 -0.2 0.2 0.1 -0.2 0.3 0.8 0.1 0.3 -0.1 -0.1 -0.2 0.6 -0.1 2.8 0.9 -0.3 -0.3 0.9 0.1 0.3 0.1 -0.4 0.2 0.8 -0.1 2 1.3 3.5 1.2 -0.2 -0.4 0.8 0.3 -6.9 -4.3 0.5 0.4 -1.1 -0.4 0.5 0 -0.1 -0.1 -1.1 -0.1 -0.3 -0.1 0.5 0 -0.6 -0.1 0.2 0.2 -1.3 -0.6 -4.4 -0.6 0.9 0.4 -1 -0.1 0.6 0.1 -0.4 0 0.3 0.2 -0.9 -0.4 -0.2 0.1 0.3 0.2 -0.4 -0.2zM72.8 23.5l1.5 2.1 0.6 -0.5 0.2 0.4 -0.3 -0.6 0.7 0.5 -0.9 -1 -0.6 -0.3 -0.2 0.3 -0.2 -0.3 0.1 0.3zM23.4 24.6l-1.9 1.6 0.5 -0.5 -0.2 0.7 0.7 -0.3zM21.6 26.2l-1.8 1.7 -0.2 0.2 0.2 -0.5 -0.7 0.8 0.2 -0.5 -0.4 0.3 -1.1 1.7 1 -1.5 -0.5 1.1 0.6 -0.7 -0.2 0.6 0.5 -0.2zM76.2 42.7l-0.6 0.6 0 0.6 0.5 -0.9 0.4 -0.1 0.2 0.3 1.2 -0.1 0.4 0.5 0.4 -0.1 -0.1 0.6 1.3 -0.6 -0.3 -0.3 -0.4 0.1 -0.1 -0.3 -0.8 -0.1 -0.3 -0.4 0.2 0.4 -1.1 -0.4zM80.3 43.4l0.5 0.6 -0.7 0.4 0.2 0.3 0.6 -0.5 0.3 0.4 0.1 -0.7 0.7 -0.3 -0.7 -0.6zM12.1 53.1l0.5 3.5 -0.1 -0.7 0.9 3 -0.7 -2.6 -0.7 -4.6zM44.6 87.6l7.3 0.4 3.7 -0.4 3.7 -0.7 3.6 -1.2 3.3 -1.3 6.1 -3.6 5.5 -4.9 4.4 -5.8 1.8 -3.2 1.5 -3.4 2 -7.1 0.4 -3.9 0.1 -3.7 -0.3 -3.8 -0.7 -3.8 -2.4 -6.8 -1.7 -3.3 -2 -3.2 -4.4 -5.1 -2.7 -2.4 -3 -2.2 -3.3 -1.9 -3.7 -1.7 -3.8 -1.3 -4 -0.8 -4.2 -0.5 -4.3 0.1 -4.3 0.5 -3.6 0.9 -6.6 2.5 -4.1 2.4 -3.7 2.9 -2.3 2.2 -4.6 5.8 -2 3.4 -4 21.6 2.7 10.4 4.4 7.8 1.2 1.6 4.7 4.8 1.7 1.3 6.2 3.9 5.9 2.3zM19.4 27.5l2.7 -3.1 0.5 -0.3 -0.4 0.5 0.3 -0.1 4.2 -2.8 1.1 -1 -0.4 -0.1 0.8 -0.7 2.4 -0.7 0.3 0.7 0.3 -0.1 -0.1 0.4 -0.3 0.1 0.5 0.2 0.3 -0.4 1.2 -0.3 0.6 0.2 -0.8 0.5 1.7 -0.4 -1.1 0.6 -3.2 0.9 -2.8 2.5 2.1 -1.1 0.5 0 0.7 -0.6 0.2 0.1 0.9 -0.9 1.2 -0.6 0 0.2 0.6 -0.1 -0.4 0.2 0.8 -0.1 0 0.4 1.4 -0.5 1.5 0.1 0.5 -0.9 0.7 0 1.8 -1.5 -0.7 -0.8 -0.9 0.3 0.7 -0.4 -0.6 0 -0.5 -0.4 0.6 -0.5 -0.5 -0.4 0.8 -0.5 -0.5 -0.1 0.5 -0.1 0.2 -0.4 -0.9 0.2 -0.2 0 0.2 -0.3 0.4 -0.3 -0.7 0.2 1.8 -0.7 0.3 -0.2 -0.4 0 1.4 -0.9 1.3 0.1 1.4 -0.4 -0.5 -0.1 1.5 -0.6 -1.1 0.1 1.8 -0.3 -3.8 0.7 -3.5 1 -3.5 1.4 -3.8 2 -3.1 2.1 -2.9 2.3 -2.7 2.7zM14.2 62.8l2 4.6 2.8 4.6 -3.6 -6.3 -2.1 -5.8zM24 75.8l1.8 1.8 0.1 0.4 1.3 1.1 -0.4 -1.2 -1.5 -0.8zM26 78.4l0.3 1.1 1.2 0.8 -0.6 -1.2zM56.2 17.7l1.1 1.4 0.8 0.1 0.5 1 -0.9 -0.5 0.3 -0.2 -0.9 -0.2 0 0.3 0.6 0.1 -0.2 0.2 0.2 0.2 -1.3 0.1 -0.7 -0.3 -0.4 0.2 0.2 0.2 0.4 -0.3 -0.3 0.3 0.4 0.6 -0.9 -0.5 -1.3 0.2 0.3 -0.3 -0.5 -0.2 -1.7 -0.2 -0.4 0.2 0 -0.4 -0.3 0.4 -0.5 -0.5 -0.1 0.3 -0.9 0.3 0.6 -0.5 -1 0.5 -0.1 -0.2 -0.4 0.2 0.1 0.2 -1.6 -0.7 -2.6 -0.5 0 -0.2 -2.6 0.6 -0.3 0.1 0.2 0.7 0.5 0.1 -0.2 0.3 -0.6 0 0.2 -0.2 -0.2 -0.1 -1.2 0.3 0.4 0.2 -0.3 0.2 0.2 0.2 1.1 -0.1 -0.2 0.6 -1.2 0.1 -0.9 0.6 0.1 0.3 -0.3 0.2 0.2 0.4 0.6 0 -0.3 0.7 0.5 -0.2 0.3 0.4 0.1 -0.2 0.6 0 -1.1 1 -1.9 0.6 0.3 0 -0.1 0.2 0.5 -0.4 1.1 0 2.3 -1.1 -0.1 -0.3 1.5 -0.8 0.3 0.2 -0.7 0 -0.3 0.5 0.3 0 -0.4 0.3 0.9 -0.4 0.5 0.1 -0.1 -0.4 0.5 -0.1 0.7 0.6 1.6 0.1 -0.2 0.2 1 0.7 0.2 -0.3 0.4 0.3 -0.1 -0.6 0.2 1.2 0.3 -0.2 -0.2 -0.4 0.2 -0.1 0.1 0.6 0.4 0.3 -0.2 0.2 0.3 0.1 0.1 0.5 0.5 0.2 0 0.6 0.4 0.3 0.1 -0.3 0 0.5 0.2 0.2 0.2 -0.2 0.2 0.8 0.6 0.1 0 0.3 -0.8 -0.2 0.2 0.4 2 1 0 -0.4 -0.6 -0.3 -0.3 -0.3 0.2 -0.2 0.3 0.5 0.4 -0.1 0.6 0.9 -0.1 0.5 -0.2 -0.6 -0.8 0 0.4 1.2 0.2 0 -0.3 1.9 0.6 2.5 1.1 1.1 0 0.4 0.8 0.7 0 0.4 1.2 0.3 0.7 0.4 1.2 2.2 1 0.7 0.1 0.5 -0.6 0 1.8 1 0.2 0.8 1.1 0.7 0.2 0.4 0.3 -0.4 -0.8 -0.5 -0.7 -1.5 -2 -2 -0.3 -1 0.6 0 0.4 0.3 1 1.6 1.7 1.2 0 0.5 0.7 0.3 1.6 1.4 0.4 0.7 0 1 1.3 0.9 4 1.1 1.2 -0.6 1.6 1.1 1.5 0.2 0.5 -0.3 -0.1 0.3 1.1 0.9 0.1 0.8 0.3 0.1 0 -0.4 0.7 0.5 0.1 0.4 0.1 -0.2 0.2 0.3 0.8 -0.1 0.1 0.4 0.4 -0.3 -0.3 -0.4 0.4 -0.6 0.6 0.1 -0.1 0.3 0.5 0.8 0.2 1.7 -1.5 3.7 0 0.8 0.3 0.2 0.1 -0.3 0.1 0.3 -0.7 1 0 1.1 0.4 0.3 0.4 0.9 0.4 3.2 1.2 0.8 0.1 0.4 -0.5 1.8 -1.7 3.4 -2.5 3.6 -3.6 3.9 0.8 -0.5 -5 4 4.2 -2.8 3.7 -3.2 3.4 -3.9 2.4 -3.5 2 -3.8 1.8 -4.7 1.1 -4.8 0.4 -4.5 -0.2 0.3 -0.7 -3.1 -0.7 0.5 -0.6 -1 -0.3 0 -0.2 -0.5 -0.4 -0.1 0.1 -0.5 -0.8 1 -0.3 -0.2 -0.6 0.4 -0.1 -0.4 -0.5 0 -0.4 0.7 0.3 1 -0.2 0.3 -0.4 -1.6 0.3 -0.4 -0.3 -0.2 -0.4 1 -0.7 0.7 -0.3 2 -0.8 -0.7 -0.4 0.1 -0.6 0.7 -0.5 0.1 -0.9 -1.1 -0.2 -2.8 -0.8 -0.3 -1.8 0.6 0.2 -0.7 -0.3 -1 0.1 -0.3 0.2 0.5 -0.2 -1 0.2 -1.1 -0.2 -0.3 -1.4 0.8 0.1 0.7 -0.3 1.1 -0.4 -0.1 -1 0.6 -1.1 -0.5 -1.2 -2 -0.4 -1.8 0.3 -0.3 -0.5 -1.3 0.4 -0.5 -0.2 -0.1 0.6 -0.3 0.1 -0.6 0.2 0.1 1.1 -0.5 0.4 0.4 0.3 -0.3 0.2 0.2 0.1 -0.2 0.4 0.2 -0.5 -0.5 0.1 -0.4 1.3 -0.4 0.6 0.4 0.3 -0.4 0.8 0.4 0.2 0.8 0.2 -0.1 0 0.4 0.7 0.8 0.4 0.4 0.3 -0.2 -0.3 -1.1 -1.6 -2.4 0 -0.9 0.5 -1.2 0 -0.5 0.2 -0.2 -0.2 -0.4 0.2 -0.2 -0.4 -0.1 0.3 -0.1 -0.8 -1.1 -0.4 -0.1 0.3 0 -0.5 -0.6 0.2 -0.1 0.7 1.2 -0.1 -0.8 -0.5 -0.5 0.4 0.2 -0.4 -1 0.3 -0.4 -0.4 0.1 0.5 -0.5 -0.2 -0.2 0.2 0.1 0.2 -0.3 -0.5 -0.2 -0.3 -1.3 0.2 0.1 -0.1 -0.3 0.2 -0.1 -0.2 -0.4 0.2 -0.6 0.1 0.3 0.3 -0.2 -0.2 0.7 0.6 0.5 -0.2 -0.7 0.2 -0.8 -0.7 -0.9 0.3 0.9 -0.6 0 -0.7 -0.7 -0.1 0.1 -0.4 -0.1 0.3 -0.4 -0.5 -0.3 -0.4 0.6 0.2 1.1 -0.6 -2 1.1 -0.8 -0.5 -1.4 -0.6 -0.5 -0.7 0 -0.1 -0.3 -0.6 0.1 -0.6 -0.2 -2.8 -1.5 0.7 0.7 0.1 0.5 -0.6 -0.1 -1.2 -0.9 -0.3 0.2 -1 -0.4 0 0.2 -0.8 0.2 1.4 1 0.3 0.6 1.4 0.8 0.2 0.5 -0.1 0.6 1.2 1 0.3 0.5 -0.2 -0.1 0.1 0.3 -1.4 -0.7 -0.9 -1 -0.7 0.2 -2.3 -0.6 -0.4 0.3 -0.8 -0.8 -0.6 0 -0.4 -0.7 -0.2 -0.7 0.2 -0.4 -0.3 -0.1 0.4 -0.1 -0.5 -0.3 0.3 0.1 -0.1 -0.3 0.4 -0.2 -0.4 -0.9 -0.3 -0.1 1 0.2 -0.6 -0.4 0.4 0.1 -0.2 -0.5 -1.3 -0.7 0.2 -0.2 -0.3 -0.1 0.5 0 -0.4 -0.3 2.6 0.7 0.3 0.6 0.5 0.2 -0.6 0.3 0.4 0.4 0.4 0 0.1 -0.4 0.4 0.2 -0.2 -0.2 1.5 0.5 0.9 -0.1 -1.3 -0.5 1.2 0.2 -2.6 -1.2 0.5 0.1 0 -0.2 0.9 0.3 -0.8 -0.7 -1.8 -0.1 -0.4 -0.2 0.2 -0.1 -0.7 -0.3 0 0.3 -0.2 -0.3 -0.3 0 0.2 0.2 -0.4 -0.3 -0.5 0 0 0.2 -1.1 -0.3 0.1 0.2 -0.3 0 0.1 0.2 -0.9 -0.5 -0.2 0.3 0.9 0.6 -0.9 -0.4 -0.2 -0.4 -0.4 0.1 0.6 0.9 0.7 0 -0.3 0.2 1.5 0 -0.5 0.1 0.6 0.3 0.3 0.8 -0.9 -0.6 -0.4 -0.1 0.3 0.4 -2.2 -1.1 -0.2 -0.3 0.3 -0.1 -0.2 -0.4z",
      r: 3.5,
      // single bubbles [x, y, island outline]: Midway Atoll, Wake Island, Johnston Atoll, Jarvis Island, Navassa Island
      dots: [
        [25.8, 39.3, "M-1.21 0.46l0.18 -0.05 0.12 0.19 0 -0.29 0.96 -0.41 -0.06 -0.24 -0.14 0.11 -0.45 -0.06 0.15 -0.35 0.43 0 0.07 0.21 -0.11 -0.29 -0.37 0 -0.33 -0.22 -0.75 0.05 -0.38 0.22 0.03 0.35 -0.14 0.36 -0.64 0.86 0.55 -0.05zM1.87 -0.3l-0.59 0.25 -0.32 -0.01 0.64 0.21 1.01 -0.16 -0.06 -0.49 -0.24 -0.43z"],
        [18.1, 42.9, "M-1.63 -0.06l0.14 -0.22 -0.25 -0.14 -0.15 -0.25 -0.13 -0.01 -0.03 0.35 1 0.7 0.29 -0.18 0.13 0.18 -0.14 -0.09 -0.26 0.14 0.38 0.28 2.76 1.12 -0.25 -0.59 -0.06 -0.92 -0.33 -0.72 -0.1 -0.73 -0.3 -0.03 -0.6 0.19 -0.17 -0.09 0.23 0.49 0.34 -0.23 0.24 0.05 0.03 0.15 -0.09 -0.03 0.06 0.06 -0.15 0.25 0.23 0.3 -0.02 0.28 0.17 0.21 -0.04 0.21 0.16 -0.05 -0.08 0.19 0.02 -0.08 -0.14 0.15 0.08 -0.15 -0.1 0.07 0.02 0.1 0.1 -0.07 -0.06 0.08 -1.11 -0.22 -0.2 -0.11 -0.05 -0.17 -0.44 0.05 -0.17 -0.29 -0.25 0.04 -0.36 -0.37zM0.2 -0.74l0.2 -0.05 -0.27 -0.43 -1.11 -0.62 0.42 0.35 0.38 0.6 -0.33 0.04 0.26 0.07 0.4 -0.09z"],
        [24.7, 46.9, "M-1.16 0.54l-0.5 0.35 -0.53 0.14 -0.07 0.2 0.17 0.41 0.84 -0.38 0.13 0.06 0.02 -0.19 0.62 -0.32 0.21 0.11 0.08 -0.34 -0.28 -0.34 -0.32 0.22 -0.03 -0.09 -0.02 0.09 -0.19 -0.04zM0.17 -1.5l-0.01 -0.12 -0.23 0.01 0.1 0.22z"],
        [33.1, 64.3, "M-0.45 1.32l-0.49 0.07 -1.17 -0.14 -0.32 -0.21 0.3 -0.64 0.83 -0.8 0.54 -0.83 0.9 -0.16 1.85 0.35 0.19 0.25 0.25 1.37 -0.16 0.68z"],
        [79.9, 44.6, "M-0.03 1.41l-0.44 -0.34 0.03 -0.09 -0.8 -1.23 -0.67 -0.84 -0.21 -0.46 0.18 -0.28 2.34 0.43 0.97 0 0.54 0.61 0.21 0.53 -0.13 0.59 0.09 0.44 -0.08 0.6 -1 0.46 -0.56 -0.15z"]
      ],
      // pills [x, y, north island outline, south island outline], x/y = the pill's centre: Kingman Reef / Palmyra Atoll; Howland Island / Baker Island
      pills: [
        [31.7, 53.3, "M-2.35 1.21l1.1 0.09 -0.62 -0.13z", "M0.36 -0.44l0.1 -0.27 0.24 0.03 0.04 0.14 0.02 -0.13 -0.64 -0.2 -0.85 0.31 -0.41 -0.17 -0.81 0.03 -0.09 0.21 0.11 -0.11 0.47 -0.05 0.48 0.2 0.18 0.21 0.88 -0.37 0.09 0.11 -0.29 0.05 0.06 0.07 0.4 -0.17 -0.15 -0.07 0.22 -0.15zM-1 0.61l-0.16 -0.01 0.06 0.09 0.77 -0.09 1.42 0.26 0.04 -0.1 -0.17 0.04 0.31 -0.25 -0.11 -0.13 0.1 -0.14 -0.18 0.04 -0.01 0.28 -0.18 0.04 -0.02 0.12 -0.15 -0.08 -0.14 0.08 -0.22 -0.19 0.01 0.13 -0.07 -0.12 -0.18 0.07 -0.18 -0.16 -0.09 0.1 -0.11 -0.13 -0.07 0.07 -0.28 -0.12zM1.23 0.23l0.2 -0.22 0.51 -0.25 -0.31 -0.15 -0.15 0.04 0 0.09 0.18 -0.07 -0.02 0.17 0.17 -0.04 -0.59 0.31zM-1.34 0.66l0.17 -0.06 -0.17 -0.09 -0.04 -0.19 0.01 0.19 -0.22 0.06zM-0.8 0.34l0.54 -0.01 -0.02 -0.19 0 0.12 -0.18 -0.05 -0.39 0.06z"],
        [22.8, 57.9, "M0.87 2.33l-0.34 0.17 -0.45 -0.05 -0.38 -0.68 -0.25 -1.63 -0.71 -2.17 0.14 -0.29 0.27 -0.17 0.69 0.26 0.49 0.43 0.77 1.68 0.16 0.95 -0.04 0.48 -0.15 0.7z", "M0.58 1.54l-2.18 -0.08 -0.62 -0.32 -0.12 -0.43 0.24 -0.48 0.99 -1.37 0.37 -0.33 0.59 -0.05 1.43 0.39 0.48 0.35 0.35 0.41 0.18 0.41 0 0.46 -0.29 0.55 -0.47 0.32z"]
      ]
    }
  };
  function globeShape(g, name, locked, extraClass) {
    const st = STATE_STYLE[name], col = "#" + (st ? st[0] : "C3C3C3");
    const inner = svgEl("svg", { x: 0, y: 0, width: 100, height: 100, viewBox: "0 0 100 100", preserveAspectRatio: "xMidYMid meet",
      class: "medal-shape" + (extraClass ? " " + extraClass : ""), "data-fit": 40 });      // data-fit 40 = the globe fills the ring like other badges
    const grp = svgEl("g", {});
    const line = { fill: "none", stroke: "currentColor", "stroke-opacity": 0.55, "stroke-width": 1, "vector-effect": "non-scaling-stroke" };
    // the first path in the group is the globe's edge: fit() measures it, so keep it first
    grp.append(svgEl("path", { d: "M12 50a38 38 0 1 0 76 0a38 38 0 1 0 -76 0z", ...(locked ? line : { fill: col, "fill-opacity": 0.14, stroke: "none" }) }));
    grp.append(svgEl("path", { d: g.land, "fill-rule": "evenodd", ...(locked ? { ...line, "stroke-opacity": 0.3, "stroke-width": 0.75 } : { fill: col, "fill-opacity": 0.3, stroke: "none" }) }));
    const r = g.r;
    const bubble = el => svgEl(el.tag, { ...el.attrs, ...(locked ? line : { fill: col, stroke: "none" }) });
    const island = (d, x, y) => svgEl("path", { d, transform: `translate(${x} ${y})`, "fill-rule": "evenodd", stroke: "none",
      fill: locked ? "currentColor" : "#000", "fill-opacity": locked ? 0.45 : 0.72 });
    g.dots.forEach(([x, y, d]) => {
      grp.append(bubble({ tag: "circle", attrs: { cx: x, cy: y, r } }), island(d, x, y));
    });
    g.pills.forEach(([x, y, north, south]) => {
      grp.append(bubble({ tag: "rect", attrs: { x: x - r, y: y - 2 * r, width: 2 * r, height: 4 * r, rx: r } }),
        svgEl("line", { x1: x - r, y1: y, x2: x + r, y2: y, stroke: locked ? "currentColor" : "#000", "stroke-opacity": locked ? 0.4 : 0.35,
          "stroke-width": 0.6, "vector-effect": "non-scaling-stroke" }),
        island(north, x, y - r), island(south, x, y + r));
    });
    inner.append(grp);
    return inner;
  }

  // Hand-picked, high-detail outlines (dc-shape.js etc.) win over the home map's coarse ones. Read at call time because they can load late.
  const overrides = () => window.SHAPE_EXTRA || {};
  let stateShapes = null;
  function shapeFor(name) {
    const over = overrides();
    if (over[name]) return over[name];
    if (!stateShapes) {
      if (!window.US_MAP_SVG) return null;          // outlines not loaded yet; don't cache the miss
      stateShapes = {};
      const t = document.createElement("div");
      t.innerHTML = window.US_MAP_SVG;
      t.querySelectorAll("path.us-st").forEach(p => {
        const n = p.dataset.name;
        let d = p.getAttribute("d");
        const keep = BADGE_ONLY[n];
        if (keep) d = (d.match(/M[^M]*/g) || []).filter(keep).join("");
        stateShapes[n] = (stateShapes[n] || "") + d;   // joins a state's pieces; BADGE_ONLY trims the ones listed above
      });
    }
    return stateShapes[name] || null;
  }

  // the home map is a conic projection, so every state is drawn tilted. This turns each one back upright.
  const STATE_LON = {Alabama:-86.8, Arizona:-111.7, Arkansas:-92.4, California:-119.5, Colorado:-105.5, Connecticut:-72.7,
    Delaware:-75.5, "District of Columbia":-77.0, Florida:-82.4, Georgia:-83.4, Idaho:-114.6, Illinois:-89.2, Indiana:-86.3,
    Iowa:-93.5, Kansas:-98.4, Kentucky:-85.3, Louisiana:-92.0, Maine:-69.2, Maryland:-76.8, Massachusetts:-71.8,
    Michigan:-84.5, Minnesota:-94.3, Mississippi:-89.7, Missouri:-92.5, Montana:-110.0, Nebraska:-99.8, Nevada:-116.6,
    "New Hampshire":-71.6, "New Jersey":-74.5, "New Mexico":-106.1, "New York":-75.5, "North Carolina":-79.4,
    "North Dakota":-100.5, Ohio:-82.8, Oklahoma:-97.5, Oregon:-120.6, Pennsylvania:-77.8, "Rhode Island":-71.5,
    "South Carolina":-80.9, "South Dakota":-100.2, Tennessee:-86.3, Texas:-99.3, Utah:-111.7, Vermont:-72.7, Virginia:-78.8,
    Washington:-120.5, "West Virginia":-80.6, Wisconsin:-89.9, Wyoming:-107.5};
  const tiltOf = name => (name in STATE_LON && !overrides()[name]) ? 0.6029 * (STATE_LON[name] + 96) : 0;

  function discSvg(ringColor, locked) {
    const svg = svgEl("svg", { viewBox: "0 0 100 100", class: "medal-disc" });
    svg.append(
      svgEl("circle", { cx: 50, cy: 50, r: 46, class: "medal-face" }),
      svgEl("circle", locked
        ? { cx: 50, cy: 50, r: 46, class: "medal-ring", fill: "none", stroke: ringColor, "stroke-width": 3, "stroke-dasharray": "3 5" }
        : { cx: 50, cy: 50, r: 46, class: "medal-ring", fill: "none", stroke: ringColor, "stroke-width": 5 }));
    return svg;
  }

  // the state's shape, upright and coloured, sized to sit inside a 100x100 medal. Returns null if there's no outline for it.
  function stateShape(name, locked, extraClass) {
    if (GLOBE_BADGES[name]) return globeShape(GLOBE_BADGES[name], name, locked, extraClass);   // UM: the globe, not an outline
    const d = shapeFor(name);
    if (!d) return null;
    const st = STATE_STYLE[name];
    const inner = svgEl("svg", { x: 0, y: 0, width: 100, height: 100, viewBox: "0 0 100 100", preserveAspectRatio: "xMidYMid meet", class: "medal-shape" + (extraClass ? " " + extraClass : "") });
    const tilt = tiltOf(name);
    const g = svgEl("g", {});
    g.append(svgEl("path", {
      d, "fill-rule": "evenodd", "vector-effect": "non-scaling-stroke", "stroke-width": 1,
      fill: locked ? "none" : "#" + (st ? st[0] : "888888"),
      stroke: locked ? "currentColor" : "none",                 // no outline once it's coloured (locked ones keep a faint one so you can see them)
      ...(tilt ? { transform: `rotate(${tilt})` } : {})
    }));
    inner.append(g);
    return inner;
  }

  // the round badge: tier ring with the state's shape inside. modesDone = how many modes are done in that state (0-6)
  function badgeSvg(name, modesDone) {
    const tier = TIER(modesDone), locked = tier === "locked";
    const svg = discSvg(TIER_RING[tier], locked);
    const inner = stateShape(name, locked);
    if (inner) svg.append(inner);
    return svg;
  }

  // Zooms each state so its farthest point just touches a circle inside the medal ring: every state fills its badge as much as it can.
  // Needs the shape on the page already (getBBox / getPointAtLength), so call it after appending.
  const FIT_RADIUS = 35;           // of the medal's 100-unit width; the ring's inner edge is about 43, so this leaves a small gap
  function fit(root) {
    const shapes = root.matches && root.matches("svg.medal-shape") ? [root] : [...root.querySelectorAll("svg.medal-shape")];
    shapes.forEach(s => {
      try {
        const g = s.querySelector("g"), path = g.querySelector("path");
        const bb = g.getBBox();
        if (!(bb.width > 0 && bb.height > 0)) return;
        const m = /rotate\(([-\d.eE]+)\)/.exec(path.getAttribute("transform") || "");
        const a = m ? parseFloat(m[1]) * Math.PI / 180 : 0, cos = Math.cos(a), sin = Math.sin(a);
        const total = path.getTotalLength(), steps = Math.min(600, Math.max(120, Math.round(total / 2)));
        const pts = [];
        for (let i = 0; i <= steps; i++) {
          const p = path.getPointAtLength(total * i / steps);
          pts.push([p.x * cos - p.y * sin, p.x * sin + p.y * cos]);     // where the point lands after the upright rotation
        }
        const cx = bb.x + bb.width / 2, cy = bb.y + bb.height / 2;
        let r = 0;
        for (const [x, y] of pts) r = Math.max(r, Math.hypot(x - cx, y - cy));
        r = Math.max(r, Math.hypot(bb.width, bb.height) / 8);           // never zoom a tiny or odd shape absurdly far
        const half = r * 50 / (parseFloat(s.getAttribute("data-fit")) || FIT_RADIUS);
        s.setAttribute("viewBox", `${cx - half} ${cy - half} ${half * 2} ${half * 2}`);
      } catch (e) { /* not drawn yet */ }
    });
  }

  // Makes sure the outline files (us-map.js, dc-shape.js, as-shape.js) are on the page, loading any that aren't.
  // Await this BEFORE drawing badges: with no outlines a badge is just an empty ring.
  let loading = null;
  const hasScript = src => [...document.scripts].some(s => (s.getAttribute("src") || "").split("?")[0].endsWith(src));
  const inject = src => new Promise(res => {
    const s = document.createElement("script");
    s.src = src; s.onload = () => res(true); s.onerror = () => { console.warn("Badge art: couldn't load " + src); res(false); };
    document.head.append(s);
  });
  const waitFor = (test, ms) => new Promise(res => {
    const t0 = Date.now();
    (function poll() { if (test()) return res(true); if (Date.now() - t0 > ms) return res(false); setTimeout(poll, 50); })();
  });
  function ready() {
    if (!loading) {
      loading = (async () => {
        for (const src of ["dc-shape.js", "as-shape.js", "us-map.js"]) {
          const isMap = src === "us-map.js";
          if (isMap && window.US_MAP_SVG) continue;
          if (hasScript(src)) { if (isMap) await waitFor(() => !!window.US_MAP_SVG, 4000); continue; }   // the page has its own tag; give it a moment
          await inject(src);
        }
        if (!window.US_MAP_SVG) console.warn("Badge art: US_MAP_SVG is missing, so state badges have no shapes. Is us-map.js next to this page?");
        return !!window.US_MAP_SVG;
      })();
    }
    return loading;
  }

  window.CountellectBadge = { TIER, TIER_RING, STATE_STYLE, svgEl, discSvg, shapeFor, stateShape, badgeSvg, fit, ready };
})();