var flashcards = (function () {
    'use strict';

    var Flashcards = /** @class */ (function () {
        function Flashcards(ids) {
            this.CardIds = [];
            this.Buckets = [];
            this.CurrentBucket = 0 /* A */;
            this.SetName = name;
            this.Buckets[0 /* A */] = [];
            this.Buckets[1 /* B */] = [];
            this.Buckets[2 /* C */] = [];
            if (ids) {
                for (var r = 0; r < ids.length; r++) {
                    this.CardIds.push(ids[r]);
                    this.Buckets[this.CurrentBucket].push(r);
                }
            }
        }
        Flashcards.prototype.next = function () {
            var limitC = 16;
            var limitB = 33;
            var last = { index: this.CurrentCardIndex, bucket: this.CurrentBucket };
            var r = Math.floor(Math.random() * 100);
            if (r < limitC && this.Buckets[2 /* C */].length > 0) {
                this.CurrentBucket = 2 /* C */;
            }
            else if (r < limitB && this.Buckets[1 /* B */].length > 0) {
                this.CurrentBucket = 1 /* B */;
            }
            else if (this.Buckets[0 /* A */].length > 0) {
                this.CurrentBucket = 0 /* A */;
            }
            else if (this.Buckets[1 /* B */].length > 0) {
                this.CurrentBucket = 1 /* B */;
            }
            else if (this.Buckets[2 /* C */].length > 0) {
                this.CurrentBucket = 2 /* C */;
            }
            else {
                alert("ERROR: No cards found.");
                return;
            }
            var count = 0;
            do {
                this.CurrentCardIndex = Math.floor(Math.random() * this.Buckets[this.CurrentBucket].length);
                count++;
            } while (last.bucket == this.CurrentBucket && last.index == this.CurrentCardIndex && count < 3);
            return this.CardIds[this.Buckets[this.CurrentBucket][this.CurrentCardIndex]];
        };
        Flashcards.prototype.correct = function () {
            if (this.CurrentBucket === 0 /* A */) {
                this.moveQuestion(1 /* B */);
            }
            else if (this.CurrentBucket === 1 /* B */) {
                this.moveQuestion(2 /* C */);
            }
            else if (this.CurrentBucket === 2 /* C */) ;
            else
                this.moveQuestion(1 /* B */);
        };
        Flashcards.prototype.wrong = function () {
            this.moveQuestion(0 /* A */);
        };
        Flashcards.prototype.moveQuestion = function (toBucket) {
            if (this.CurrentBucket !== toBucket) {
                this.Buckets[toBucket].push(this.Buckets[this.CurrentBucket][this.CurrentCardIndex]);
                this.Buckets[this.CurrentBucket].splice(this.CurrentCardIndex, 1);
            }
        };
        Flashcards.prototype.resetBuckets = function () {
            this.Buckets[0 /* A */] = [];
            for (var c = 0; c < this.CardIds.length; c++) {
                this.Buckets[0 /* A */].push(c);
            }
            this.CurrentBucket = 0 /* A */;
            this.Buckets[1 /* B */] = [];
            this.Buckets[2 /* C */] = [];
        };
        return Flashcards;
    }());

    return Flashcards;

}());
