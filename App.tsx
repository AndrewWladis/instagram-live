import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, Image, View } from 'react-native';
import { Feather, Octicons } from '@expo/vector-icons';

export default function App() {
  const [facing, setFacing] = useState<CameraType>('front');
  const [watchers, setWatchers] = useState(500);
  const [permission, requestPermission] = useCameraPermissions();
  const [comments, setComments] = useState([]);

  const texts = [
    "YOOOO!", "ANDY!!!", "Andy's back?!!?", "Mr. Wladis ?!", "I'm a big fan", "rizz", "uwu", "???", "rip liam payne",
    "What's going on with the hair????", "you're so sigma", "haven't seen you in a minute", "new stream?", 'get freaky',
    "bruh what is goin on !", "bruh", "have u had the grimace shake yet?", 'yasss', 'no cap', 'those who know', 'bruh moment',
  ]

  const emojis = ["🤣", "💀", "🤭", "😈", "😭", "🤠", "👽", "🥶", "🤑", "😀", "😅", "😍", "😱", "😎", "🥰", "🫡", "🤢"]

  const usernames = [
    "sunshine_vibes123", "dreamy_clouds", "urban_legend87", "stargazer_luna", "wildflower_23", 'ttpd',
    "ocean_breeze_", "choco_mocha", "doodle_bug_", "sassy_queen99", "starry_knight",
    "pixel_dreamer", "trendsetter77", "cosmic_fox", "jazzberry_smile", "wanderlustly",
    "panda_giggles", "neon_rainbow", "blush_n_glow", "grape_escape", "coffee_lush",
    "smile_snapper", "nightowl_96", "bubbly_gal", "pastel_chaos", "booklover_xyz",
    "artsy_dreamer", "pizzalover007", "happy_trekker", "epic_journeyer", "cosmic_waves",
    "sunkissed_soul", "butterfly_daze", "cactus_cutie", "floral_blossom", "boba_babe_89",
    "mango_crush", "galaxy_vibes_", "retro_spark", "twinkly_eyes", "cloud_nine99",
    "chill_wanderer", "bubblepop_love", "funky_doodle", "violet_waves", "daisy_chaser",
    "sweet_peach_", "urban_adventurer", "meow_kitty11", "cotton_candy_", "palm_tree_dreams",
    "serendipity_heart", "midnight_owl_", "aesthetic_guru", "pixel_painter", "glimmer_guru",
    "melon_queen", "soulful_tunes", "cheeky_chick_", "vintage_muse", "teal_flame",
    "rainbow_rider", "minty_crisp", "cookie_dough_", "pastel_sprinkles", "dreamcatcher_yas",
    "mystic_moon_", "fizzy_dreamer", "blissful_fox", "pink_latte99", "zen_zenith",
    "wanderlust_queen", "polka_dot_fun", "retro_doodles", "fun_run23", "snazzy_dream",
    "wild_gypsy", "sunkissed_muse", "peachy_blossom", "cool_kite", "aqua_breeze_",
    "funky_star_", "smile_squishy", "puffy_clouds_", "golden_glo", "sweet_bubble_",
    "mystic_tales", "cosmic_whims", "vibrant_veins", "neon_dreamz", "witty_banana",
    "sugarplum_fizz", "serene_tides_", "jazz_hopper_", "bold_explorer", "fluffy_kittens",
    "mocha_dreams", "candy_galaxy", "vintage_vibes_", "mint_tales_", "quaint_queen",
    "happy_lark_", "sassy_doodle_", "whisker_wink", "golden_pearl", "firefly_wisp",
    "cheeky_zebra", "sunny_smiles_", "purple_nova", "bubblegum_punk", "zesty_orange",
    "glam_voyager", "artful_aura", "quirky_fox_", "pastel_peach_", "cool_whale_",
    "magic_melon", "star_chaser99", "snap_dreamer", "urban_heart_", "witty_voyager",
    "jellybeans_rule", "moonlight_gal", "epic_guru23", "honey_love_", "bubble_rider",
    "wander_trails", "chill_peach_", "sky_dreamer_", "cheerful_mist", "rainbow_crush",
    "happy_trotter", "frosty_charm", "cloudy_dreamz", "gleam_star_", "mellow_blossom",
    "peppermint_vibes", "quaint_clouds", "pixie_tales_", "starry_eyes_", "doodle_fizz",
    "playful_spark", "bubbly_pearl", "minty_trooper", "radiant_zen", "sparkle_galaxy",
    "snappy_waves", "aqua_pearl_", "blissful_sun", "pink_zephyr_", "jazzy_peach",
    "bright_auras", "vintage_pixie", "whimsy_tales", "foxie_gal_", "rosey_muse_",
    "magic_moments_", "wildberry_zen", "zany_vibes_", "mint_peach_", "doodle_fox",
    "retro_witch", "blueberry_hues", "sunny_paws_", "moonlit_tales", "jazzy_voyager",
    "spunky_star", "sassy_fizz", "dreamy_sails_", "zen_journeys", "cosmo_smiles",
    "melody_whisk", "sunbeam_zest", "fizzy_pearl_", "plush_lush", "cottony_dreams",
    "mystical_fox", "radiant_sun_", "bubbly_galaxy", "aqua_daisy_", "golden_blossoms",
    "whisker_dream", "sparkle_paws", "cloudy_blossom", "funky_whale_", "cheeky_auras",
    "slayzillaaa", "rizz_goblin", "yeetopia_", "sus_bae420", "snacc4lyfe",  
    "no_cap_fr", "goatlordzz", "tacobell_papi", "vibecatcher69", "ice_king_qt",  
    "kawaii_demonnn", "goblin.mode", "doja_dawg", "skrrrt_mama", "drip_princee",  
    "shrekonomics", "ratlord666", "urboi_bananas", "toxic_rizzler", "slayqueen._101",  
    "alpha_froggy", "ghosting_baddie", "roflcopter_", "cereal_banditz", "goblin.girlzzz",  
    "uwu_bruuh", "toaster.vibes", "capytastic", "ur_mom_uwu_", "mcdonalds.plug",  
    "lil.pogchamp", "eepy.gorl", "snail.fartz", "cringe_factory", "sk8r_simp",  
    "yassified_rat", "breadstickz420", "hotdog_demon", "chunky.pickle", "froggy.wet",  
    "minecraft_daddy", "wholesome_rat", "noodle_4eva", "sussy.baka.zzz", "ghost.frog",  
    "void_cutie_", "big_sad69", "pizza_goblin", "burgerqueen69", "emo.banana",  
    "fishytendiez", "pog_father_", "crybaby_boi", "gummywormzzz", "taco.dreamzz",  
    "pigeon_plug", "ratatouille69", "unhinged_bae", "vibin_frogz", "kanye_shrek",  
    "toxic_pickle", "goblin.energy", "capn.crunchy", "lil_biscuit_", "cowboy_shrek",  
    "yeet.fairy", "dumb_bellz", "skater.brat", "vibe_snail_", "cactus.goth",  
    "breadfroggy_", "em0_rat_boi", "boba.slurper", "zoomer_dweeb", "froggiez_go_brr",  
    "rizz._daddy", "whisker_goblin", "based_fishyyy", "snackrat._", "minecraft_rat",  
    "sus_lord666", "void.chickenn", "monke.dreamz", "floppy_frogg", "cosmo.taco",  
    "snacc.god", "moist.ratzz", "bean_burritoz", "chonky_boi69", "chickennuggyzz",  
    "shrimpz_rule", "snailqueen666", "icecreamdemon", "pickled.brat", "savage_rattz",  
    "soda_fiend_", "voided_vibez", "froggyrizzler", "rat4president", "doja_rattz",  
    "goblinn.brat", "bubble.fartz", "tiktok_ratzz", "snackdaddy99", "vape.goth69",  
    "gremlin_boi", "sparkly_yeet", "goblin.spaz", "rotten.snacc", "snailzzforever",  
    "yassified_frog", "skater_ratzz", "zoomy.chicken", "toxic.froggy", "burp_szn",  
    "drippy_fish_", "rizzgod420_", "froggy_demonn", "pizzabrat69", "sussy._rat",  
    "mochi_l0rd", "crybaby_frogg", "salty_vibez", "dino.gorlzz", "fishystickzzz",  
    "goated_sausage", "rat_lover_xx", "ghosty_szn_", "bubblebath_uwu", "gucci.froggy",  
    "unhinged.taco", "based.chicken", "toxic_wizard", "yolo_ratzzz", "froggy.papii",  
    "voidqueen666", "sus.fairy", "sk8r.tooth", "bubblewrap420", "gummy_dinos",  
    "rattleroyale", "gamer_gobbo", "fishyslayer_", "sassy_slushie", "froggoblin99",  
    "burp.goddess", "cringe.fairy", "ratdripperzz", "slimequeen_", "sad_rat_pog",  
    "gummybear.dog", "rofl_pigeon", "susy_nuggies", "uwu_bubblez", "voidycat_uwu",  
    "pizza_snatcher", "goated_ratz", "froggybrrr", "sk8rz_sauce", "unhinged_boba",  
    "based_bae_", "sparkly_gamer", "kanye_brat_", "rotten_pizza_", "yeetburglar",  
    "ghosty_noodzz", "pickle_slaps", "snacc_rizzler", "capybara_brat", "susypasta_",  
    "rat_vibes999", "drippyyburrito", "burritoking69", "skater_sheep", "bubbleteazzzz",  
    "snail_potato", "froggy_fartzzz", "pizza_bae420", "meme.goddd", "void.pickle",  
    "toxic_snail_", "gremlinn.bae", "cringe.n.chill", "soda.snackz", "sk8rat_daddy",  
    "fishyy_vibes", "bubblewrap69", "crybaby_taco", "rizzlord_demon", "unhinged_bratz",  
    "froggify_me", "rat_swaggyy", "gummywormzzz", "burger_brat_", "snailzcap",  
    "yass_queen_rat", "basedfrog_99", "snail_drools", "void_queen69", "tacocat_bruh", 'weeknd', 'wizkhalifa', 'drake', 'edsheeran', 'justinbieber'
  ]

  function returnRandomComment() {
    let commentText = texts[Math.floor(Math.random() * texts.length)];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    const randomNumberOfEmojis = Math.floor(Math.random() * 20) - 15;
    
    if (randomNumberOfEmojis > 3) {
      commentText = '';
      for (let i = 0; i < randomNumberOfEmojis; i++) {
        commentText += randomEmoji;
      }
    } else if (randomNumberOfEmojis > 0) {
      for (let i = 0; i < randomNumberOfEmojis; i++) {
        commentText += randomEmoji;
      }
    }

    return {
      text: commentText,
      username: usernames[Math.floor(Math.random() * usernames.length)],
    };
  }

  useEffect(() => {
    requestPermission();
    setComments(
      Array.from({ length: 6 }, () => returnRandomComment())
    )
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      let newWatchers = watchers + (Math.floor(Math.random() * 20) - 10);
      if (newWatchers <= 0 || newWatchers >= 1000) {
        setWatchers(500);
      } else {
        setWatchers(newWatchers);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setComments(previousComments => [...previousComments.slice(1), returnRandomComment()]);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing}>
        <View style={styles.topSection}>
          <View style={styles.topLeft}>
            <Image source={require('./assets/andy.png')} style={styles.pfp} />
            <Text style={styles.username}>andywl27</Text>
          </View>
          <View style={styles.topRight}>
            <View style={styles.liveContainer}>
              <Text style={styles.liveText}>LIVE</Text>
            </View>
            <View style={styles.watchersContainer}>
                <Feather name="eye" size={14} color="white" />
                <Text style={styles.watchers}>1,351,{Math.abs(watchers).toString().padStart(3, '0')}</Text>
            </View>
            <Feather name="x" size={35} color="white" />
            </View>
          </View>
        <View>
          <View style={styles.commentsContainer}>
            {comments.map((comment, index) => (
              <View style={styles.commentSentContainer} key={index}>
              <Text style={styles.commentUsername}>{comment.username}</Text>
              <Text style={styles.commentText}>{comment.text}</Text>
            </View>
          ))}
        </View>
        <View style={styles.bottomSection}>
          <View style={styles.commentContainer}>
            <Text style={styles.comment}>Add a comment...</Text>
          </View>
          <Octicons name="diff-added" size={30} color="white" />
          <Octicons name="person-add" size={30} color="white" />
            <Feather name="send" size={30} color="white" />
        </View>
      </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomSection: {
    alignSelf: 'flex-end',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    marginBottom: 30,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  liveContainer: {
    backgroundColor: '#ff0764',
    paddingHorizontal: 8,
    borderRadius: 5,
    height: 35,
    justifyContent: 'center',
  },
  liveText: {
    fontSize: 15,
    color: 'white',
  },
  comment: {
    fontSize: 17,
    color: '#919191',
  },
  commentContainer: {
    borderWidth: 1,
    borderColor: '#919191',
    borderRadius: 50,
    padding: 6,
    maxWidth: 150,
  },
  commentsContainer: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginBottom: 10,
  },
  commentSentContainer: {
    flexDirection: 'column',
  },
  commentUsername: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
  },
  commentText: {
    fontSize: 15,
    color: 'white',
    marginBottom: 10,
  },
  container: {
    flex: 1
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
    color: 'white',
  },
  camera: {
    flex: 1,
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  topLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    minWidth: '100%',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: 50,
    paddingHorizontal: 15,
    maxHeight: 50,
  },
  pfp: {
    width: 30,
    height: 30,
    borderRadius: 15
  },
  username: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 10,
  },
  watchers: {
    fontSize: 15,
    marginLeft: 6,
    color: 'white',
  },
  watchersContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    marginHorizontal: 5,
    paddingHorizontal: 8,
    borderRadius: 5,
    height: 35,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
