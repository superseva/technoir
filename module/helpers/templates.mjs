/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
 export const preloadHandlebarsTemplates = async function() {
  return loadTemplates([

    // Actor partials.
    "systems/technoir/templates/actor/parts/actor-adjectives.html",
    "systems/technoir/templates/actor/parts/actor-objects.html",
    "systems/technoir/templates/actor/parts/actor-programs.html",
    "systems/technoir/templates/actor/parts/actor-connections.html",
    "systems/technoir/templates/actor/parts/actor-effects.html",
  ]);
};
