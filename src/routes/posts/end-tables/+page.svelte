<script>
	import tableFrames from './images/table-frames.jpg';
	import panelGrooves from './images/panel-grooves.png';
	import legMortises from './images/leg-mortises.png';
	import postFinishing from './images/post-finishing.png';
	import tableTop from './images/table-top.png';
	import mortiseAndTenonImage from './images/mortise-and-tenon.png';
	import banner from './images/banner.png';
	import ImageUnderlay from '$lib/components/image-underlay/ImageUnderlay.svelte';
	import BannerImage from '$lib/features/posts/banner-image/BannerImage.svelte';
</script>

<BannerImage src={banner} alt="" />

<div class="prose self-center md:w-3/5">
	<h1>Wood Project: End Tables</h1>
	<hr class="hr" />

	<p>My summary, "You would not believe how easy it is", is satire.</p>
	<p>
		I graduated from CalU during mid-covid. Without a job and with a my graduate school application
		in the air, I had lots of spare time. I wanted to give my mom an August birthday gift that was
		personalized for her and by me. I decided to make a set of end tables to replace their very old,
		wobbly ones. As with many things, I underestimated the time to complete.
	</p>

	<h2>Preface</h2>
	<h4>On the Acquisition of Tools</h4>
	<p>
		I was blessed to have a machinist for a grandfather. He gave many of his tools to encourage my
		hobby, namely a bandsaw, tablesaw, and drill press. At the time of writing, I'm visiting him in
		a couple weekends and will give him another thanks/hug.
	</p>
	<p>For hand tools, I had a rusty 5" bench plane.</p>
	<p>
		I invested in a DeWalt 734 thickness planer only halfway through the project, as the need for
		milling become more apparent.
	</p>
	<h4>Helpers</h4>
	<p>This project was my fixation for a long time, but I had many helpers, notably:</p>
	<ul class="mt-4 list-inside list-disc space-y-2">
		<li>Dad MacLean (Motivation, insight, shelf fitting, assembly, finishing)</li>
		<li>Liz MacLean (Drilled several mortises, cut several tenons, assembly)</li>
		<li>My neighbor Biff (Helped sand the frame)</li>
		<li>My future-wife Emily (Supportive)</li>
		<li>My mom (Stylistic direction)</li>
	</ul>
	<h2>The Legs</h2>
	<h4>Getting Them</h4>
	<p>
		The first thing I bought was eight 2"x2" poplar legs. I went to a lumber supply corp and asked
		for 2"x2". The closest thing they had was 1.75"x1.75" primed legs. I figured painted furniture
		would be fine and dropped the cash. When I got home, I backstepped, and decided I'd remove the
		paint. After a couple days of using (expensive) paint stripper, I revealed a set of poplar legs.
		Its pores were embedded with of microscopic primer pigment. I sharpened the bench plane more
		than it's ever been sharpened, and with a couple clean strokes, the poplar was bare wood again.
		Rather than buying correctly the first time, I wasted lots of time preparing something that was
		less certain. Worse, I bought the exact number of legs required. I did not want to redo the
		stripping process again, so I inadvertently gave myself almost no room for error. I hope that
		I've made better purchasing decisions since then.
	</p>
	<p>Around this time, I also received my acceptance letter from grad school. (Foreboding).</p>
	<h4>Detailing Them</h4>
	<p>
		There's a subtle interior taper on the legs below the drawer. To get the taper, I made a jig for
		my tablesaw, which held the length of the leg at a slight angle as it fed through the blade. I'm
		not very comfortable with the table saw, which makes me cautious and over-plan. To my amazement,
		this resulted in only one complication, burn marks from a dull blade. Like the primer pigment
		removal, however, I used my bench plane and skimmed off the burn. Things were going slowly, but
		they were going well. It had been maybe three months, but there was lots of logistics I was
		planning out, materials I was purchasing, and truthfully I have a habit of chewing on projects.
		At this point in the project timeline, I expected to be done. I had eight legs and two full end
		tables to complete. And, grad school started in two weeks. What little progress I had made was
		about to turn into a crawl.
	</p>

	<h4>Mortising Them</h4>
	<p>
		"Mortise and Tenon" is a common method of
		<a
			class="anchor"
			href="https://www.google.com/url?q=https://en.wikipedia.org/wiki/Joinery&amp;sa=D&amp;source=editors&amp;ust=1769279717382441&amp;usg=AOvVaw30Ju9fqpGGmIqGzWX-T6PV"
		>
			joinery
		</a>
		between two structures. The "mortise" is a hole in a surface, and the "tenon" is the mating piece
		that fits into the hole perfectly. To prevent rotation of the tenon, the mating profile is typically
		a square. If well-fit, the mortise and tenon leave no space for jarring movement.
	</p>
	<div class="captioned-image">
		<ImageUnderlay
			src={mortiseAndTenonImage}
			alt="Image of a typical mortise and tenon"
			class="h-[400px]"
		/>
		<p>Mortise and Tenon (First Google Result)</p>
	</div>
	<p>
		During blueprinting, I decided that mortise-and-tenon would be a good structural approach: The
		legs would have 3 mortises, and 3 horizontal rails with tenons would connect all of the legs.
		With 3 mortises per face, 2 faces per leg, and 8 legs, I had to make 48 mortises with minimal
		mistakes. I was unskilled with a chisel, and this required much repetition, so I used a
		technique to compensate. For the first pass, I drilled three circular holes to remove the bulk
		of the material within each mortise. For the second pass, I uses a sharpened chisel to square
		the circular remnants. See below:
	</p>
	<div class="captioned-image">
		<ImageUnderlay src={legMortises} alt="Image of a leg mortises" class="h-[450px]" />
		<p>Leg mortises</p>
	</div>
	<p>
		Not every leg was perfect, and I had no replacements. So I moved the pretty faces towards the
		front, and the less pretty faces towards the back. If you notice in the photo, the mortise lines
		don't... line up. I don't remember whether this originated during line drawing, tenon cutting,
		or mortise cutting. But this misstep resulted in a recurring problem: the lack of universally
		compatible parts, and the need for tailoring. Every. Piece. Much, much time was consumed
		tweaking tenons pieces to be compatible with one (or sometimes three, if I was lucky) mortises.
		I entered this project with only artistic woodworking experience, where the answer to "how many
		times do I have to do this?" was "twice at most". Around this point, dread began to surround the
		project. Around this point, grad school started. And my mom's birthday passed.
	</p>
	<p>
		It took several months to complete the full frame. On weekends, I would drive to my family and
		spend the weekend in the woodshop with power tools. I'd return with the frame in my car, and
		sand and chisel in our apartment on the carpet, like a tired monkey who wanted to be free of the
		responsibility. I used a japanese pull saw and bench square to cut out all four recesses around
		all 48 tenons, chiselled each edge to be smooth, and chiselled the faces to point inwards to the
		tenons wouldn't stick out (this took the most time of anything). Eventually, the frames
		dry-fitted successfully; each rail had its own labels to denote the table (A or B), the outer
		face, and which two mortises it fit into. It was truly a jigsaw, but it looked good. I completed
		the frame around Christmas, and I was emboldened.
	</p>
	<div class="captioned-image">
		<ImageUnderlay src={tableFrames} alt="Image of a typical mortise and tenon" class="h-[280px]" />
		<p>Two frames in my apartment</p>
	</div>
	<h2>The Panels</h2>
	<p>
		The design features three side panels that fill in the gaps between the lower frame. I wanted
		something light and easy to work with, so I opted for Baltic birch plywood. To mitigate
		expansion/contraction of the legs, I decided that I would let the panels mostly hang freely
		within a cutout frame of the legs and rails. It's grainy, but see the grooves in the below
		picture.
	</p>
	<div class="captioned-image">
		<ImageUnderlay
			src={panelGrooves}
			alt="Image of a the grooves that hold the panel"
			class="h-[280px]"
		/>
		<p>The panel is pressed outwards, into the grooves</p>
	</div>
	<p>
		I used a router to cut the grooves. The panel had to be flush against the groove, so I ensured
		that the visible line was straight by cutting them on their side. The depth of the router was
		the only variable that mattered. This was especially convenient, I had to "approach" the right
		cutting depth iteratively. I would make a cut, see if all four sides were flush, and make
		another cut if not. By now, I had learned enough to ensure that every tenon was precisely the
		same thickness, reducing overall rework. After the panels were complete, they would be pressed
		into the opening from the inside, and clamped in with a small chunk of wood screwed into the
		tenon. Surprisingly effective.
	</p>

	<p>
		I wanted the appearance of the shelf going into the legs (rather than cutting around it). Each
		shelf is a true rectangle, and we crept up on the required dimension. This constraint added some
		interesting complexity into the assembly of the shelf. The shelf panel is delicately inserted
		upwards between the rails, front-face first. Then, the back is slowly lifted into position. The
		fit is so snug that we didn't even need supports, although we installed them regardless.
	</p>

	<h2>The Table Top</h2>
	<p>
		The table top is a "soft maple". Its softness isn't a great concern, however, it's plenty hard.
	</p>
	<div class="captioned-image">
		<ImageUnderlay src={tableTop} alt="The maple tabletop" class="h-[450px]" />
		<p>Blurry photo of maple tabletop</p>
	</div>
	<h4>Getting the Lumber (Story Heavy)</h4>
	<p>
		I bought it early in the project at a family-owned Polish lumber mill in rural Pittsburgh. I
		arrived at the yard as soon as I realized that I was still wearing my slippers. I was still
		Covid cautious and put on my mask. I walked into the main building and was not greeted by a room
		of old Polish poker players. I have never felt more judged. Nonetheless, the owner Tony (a nice,
		huge fellow in overalls and a demin cap) came up to me and I picked out some nice woods.
	</p>
	<p>
		I told him some guy on Google said they do surfacing. He looked surprised and a little annoyed.
		He drew open a barn door, and inside was a slurry of gargantuan milling machines and spare
		parts. I helped him kick on the planer (which could accept a four-foot wide board, which by all
		accounts is massive). We fed the boards through the rusty monster and they came out...
		beautifully, I couldn't believe it. He told me very directly to purchase a thickness planer of
		my own. We settled up, and (somehow) to my surprise, he only took cash. I gave him my $20 bill,
		and he trusted that I'd return with the rest. When I did, he wasn't in the main building. I
		found a side building with the lights on. There were many tables and various surfaces,
		past-tense. Each one had a 3-foot-tops pile of stuff up to the middle. I didn't even see him; he
		was in the far back, sharpening sawblade teeth on a 2-foot diameter saw blade. Surreal
		experience, but a very intriguing place.
	</p>
	<h4>The Design</h4>
	<p>
		The dark edges in the top weren't deliberate, at first. When I got the maple back, I realized
		that the color patterns didn't give me enough of a single color profile. The darker tones are
		the "heartwood", which is the core of the tree. I decided to adopt this into the design, like
		racecar stripes. The board at the end, called a "breadboard" is largely decorative, but hides
		the unfinished appearance of the end grain. Because the grain of the breadboard and tabletop are
		perpendicular, the wood can expand and contract in opposing directions. If the two surfaces were
		glued along their lengths, the surface could easily rip apart. The breadboard actually hides a
		12" wide mortise, which mates with the tabletop's 12" wide tenon. This mortise and tenon was far
		more complicated than the ones in the legs to allow for wood movement:
	</p>
	<ul>
		<li>
			Confession: I followed The Wood Whisperer's guide for this. I watched the segment at least ten
			times to make sure I got it right:
			<a
				href="https://www.google.com/url?q=https://www.youtube.com/watch?v%3DTFn7JZmyFqk&amp;sa=D&amp;source=editors&amp;ust=1769279717398046&amp;usg=AOvVaw3xIpX2JXXxyT3whNBz2dLk"
				>Watch Here</a
			>
		</li>
		<li>The dowels go through the mortise and the tenon</li>
		<li>
			The hole in the tenon is slightly offset from the hole in the mortise. As the dowel is forced
			through the hole, it draws the two pieces together
		</li>
		<li>The outer two dowel holes are extra wide, allowing growth movement</li>
		<li>
			Three dowels and a few drops of glue are the only thing holding the two pieces together. Both
			are glued to the mortise (breadboard), but only the center dowel is also glued to the tenon.
			The center provides a strong anchor in all directions, and the outer dowels allow side-to-side
			racking, but still provide binding tension between the two pieces
		</li>
	</ul>
	<h4>The Rework</h4>
	<p>
		The tabletop gave me much stress. Adopting the racecar stripes put me in another pickle, where
		the pieces were far less replaceable. Overall, I hit the following complications on the
		tabletop:
	</p>
	<ul class="mt-4 list-inside list-disc space-y-2">
		<li>Slightly overcut the breadboard</li>
		<li>Broke one of the dowel holes in the tenon, had to reconstruct a tenon</li>
		<li>
			Dowel holes proved too small while hammering in the dowels, resulting in re-drilling the dowel
			holes (x4)
		</li>
		<li>The mortise was too shallow, had to re-cut the mortise</li>
		<li>Tablesaw wasn't square while cutting the long tenon, resulting in an overcut</li>
		<li>
			Tablesaw blade was too high while cutting the long tenon, resulting in me almost completely
			removing it. I noticed this about 2" into the cut and stopped. This would have been
			irreparable
		</li>
		<li>
			Accidentally glued the racecar stripes together backwards. Had to replace one of the boards
		</li>
		<li>One tabletop was cupped significantly. Had to replace one of the boards</li>
		<li>Surfaces had knots, making planing very difficult and destructive</li>
		<li>Surface proved to not be very accepting of stain. Had to re-surface after staining (x4)</li>
	</ul>

	<h2>The Drawers</h2>
	<p>
		I love smooth-closing drawers, so I splurged on Salice Progressa under-drawer slides. The drawer
		slides were the first thing I purchased but the last thing I used. By the time I got to building
		the drawers, I had the frames, panels, and tabletops done. It had been roughly a year and a half
		since I started. But the end was in sight.
	</p>
	<p>
		I wanted to make a drawer that was useful. Drawers that go out 5 inches then stop suddenly give
		me the shakes. Drawers that are so deep that things pile up on each other and get lost make me
		sad. These drawers are long and shallow.
	</p>
	<p>
		The drawers are Baltic birch boxes with a racecar-stripe soft maple face. The construction was a
		fairly simple tongue-and-groove joints. I assembled the boxes much faster than I expected, and
		when I finally unpackaged the Salice slides, I thought I was losing my mind as I tried to fit
		two pieces marked "L" onto the side drawer. I drove to Woodcraft a month later (it was very
		inconvenient timing), and I explained that my package had to "Left" brackets. They sighed, since
		only a month prior, someone gave them a package with two "Right" brackets, which they had to
		return to Salice. Not really my problem but I understood the grief. I was finally ready to
		assemble and finish.
	</p>

	<h2>Finishing</h2>
	<p>I finished differently across the project. I took the following approach:</p>
	<ol>
		<li>Glue the frame together, then stain/coat</li>
		<li>Join the tabletop and breadboard, then stain/coat</li>
		<li>Glue the drawer together, then stain/coat</li>
		<li>Stain/coat the drawer face</li>
		<li>Stain/coat the panels + shelf</li>
	</ol>
	<p>For final assembly, I then:</p>
	<ol>
		<li>Insert panels + shelf</li>
		<li>Screw drawer slides onto the frame</li>
		<li>Screw drawer slide adapter into drawer</li>
		<li>Screw drawer face onto the drawer</li>
		<li>Screw tabletop onto the frame using Expansion Brackets</li>
		<li>Screw panel supports into interior</li>
		<li>Insert drawer (Incredibly satisfying)</li>
	</ol>

	<p>
		The set was completed in June of 2024, a few months and two years after I began. I counted it as
		a birthday gift to my mom. This was my largest woodworking endeavor to this point, and I was
		woefully underprepared for the effort involved to make something I was proud of. Nonetheless, I
		am tremendously proud. The memories I have working with my family are treasures, and the
		experience I earned will hopefully prevent some simple, painful mistakes.
	</p>
	<div class="captioned-image">
		<ImageUnderlay src={postFinishing} alt="One of the finished tables" class="h-[450px]" />
		<p>One of the finished tables</p>
	</div>
	<p>Thank you for reading!</p>
</div>
