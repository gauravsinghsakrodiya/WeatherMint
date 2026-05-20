
import { lockScroll }
    from "./utils/scroll.js";

import { initTypewriter }
    from "./utils/type-writer.js";

import { initSearchEvents }
    from "./events/search-events.js";

import { initLocationEvents }
    from "./events/location-events.js";

lockScroll();

initTypewriter();

initSearchEvents();

initLocationEvents();

