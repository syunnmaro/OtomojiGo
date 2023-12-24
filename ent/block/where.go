// Code generated by ent, DO NOT EDIT.

package block

import (
	"graphql-test-api/ent/predicate"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
)

// ID filters vertices based on their ID field.
func ID(id string) predicate.Block {
	return predicate.Block(sql.FieldEQ(FieldID, id))
}

// IDEQ applies the EQ predicate on the ID field.
func IDEQ(id string) predicate.Block {
	return predicate.Block(sql.FieldEQ(FieldID, id))
}

// IDNEQ applies the NEQ predicate on the ID field.
func IDNEQ(id string) predicate.Block {
	return predicate.Block(sql.FieldNEQ(FieldID, id))
}

// IDIn applies the In predicate on the ID field.
func IDIn(ids ...string) predicate.Block {
	return predicate.Block(sql.FieldIn(FieldID, ids...))
}

// IDNotIn applies the NotIn predicate on the ID field.
func IDNotIn(ids ...string) predicate.Block {
	return predicate.Block(sql.FieldNotIn(FieldID, ids...))
}

// IDGT applies the GT predicate on the ID field.
func IDGT(id string) predicate.Block {
	return predicate.Block(sql.FieldGT(FieldID, id))
}

// IDGTE applies the GTE predicate on the ID field.
func IDGTE(id string) predicate.Block {
	return predicate.Block(sql.FieldGTE(FieldID, id))
}

// IDLT applies the LT predicate on the ID field.
func IDLT(id string) predicate.Block {
	return predicate.Block(sql.FieldLT(FieldID, id))
}

// IDLTE applies the LTE predicate on the ID field.
func IDLTE(id string) predicate.Block {
	return predicate.Block(sql.FieldLTE(FieldID, id))
}

// IDEqualFold applies the EqualFold predicate on the ID field.
func IDEqualFold(id string) predicate.Block {
	return predicate.Block(sql.FieldEqualFold(FieldID, id))
}

// IDContainsFold applies the ContainsFold predicate on the ID field.
func IDContainsFold(id string) predicate.Block {
	return predicate.Block(sql.FieldContainsFold(FieldID, id))
}

// AuthorID applies equality check predicate on the "author_id" field. It's identical to AuthorIDEQ.
func AuthorID(v string) predicate.Block {
	return predicate.Block(sql.FieldEQ(FieldAuthorID, v))
}

// Speed applies equality check predicate on the "speed" field. It's identical to SpeedEQ.
func Speed(v float64) predicate.Block {
	return predicate.Block(sql.FieldEQ(FieldSpeed, v))
}

// Speaker applies equality check predicate on the "speaker" field. It's identical to SpeakerEQ.
func Speaker(v string) predicate.Block {
	return predicate.Block(sql.FieldEQ(FieldSpeaker, v))
}

// Volume applies equality check predicate on the "volume" field. It's identical to VolumeEQ.
func Volume(v float64) predicate.Block {
	return predicate.Block(sql.FieldEQ(FieldVolume, v))
}

// Pitch applies equality check predicate on the "pitch" field. It's identical to PitchEQ.
func Pitch(v int) predicate.Block {
	return predicate.Block(sql.FieldEQ(FieldPitch, v))
}

// Texts applies equality check predicate on the "texts" field. It's identical to TextsEQ.
func Texts(v string) predicate.Block {
	return predicate.Block(sql.FieldEQ(FieldTexts, v))
}

// Duration applies equality check predicate on the "duration" field. It's identical to DurationEQ.
func Duration(v int) predicate.Block {
	return predicate.Block(sql.FieldEQ(FieldDuration, v))
}

// PartID applies equality check predicate on the "part_id" field. It's identical to PartIDEQ.
func PartID(v string) predicate.Block {
	return predicate.Block(sql.FieldEQ(FieldPartID, v))
}

// AuthorIDEQ applies the EQ predicate on the "author_id" field.
func AuthorIDEQ(v string) predicate.Block {
	return predicate.Block(sql.FieldEQ(FieldAuthorID, v))
}

// AuthorIDNEQ applies the NEQ predicate on the "author_id" field.
func AuthorIDNEQ(v string) predicate.Block {
	return predicate.Block(sql.FieldNEQ(FieldAuthorID, v))
}

// AuthorIDIn applies the In predicate on the "author_id" field.
func AuthorIDIn(vs ...string) predicate.Block {
	return predicate.Block(sql.FieldIn(FieldAuthorID, vs...))
}

// AuthorIDNotIn applies the NotIn predicate on the "author_id" field.
func AuthorIDNotIn(vs ...string) predicate.Block {
	return predicate.Block(sql.FieldNotIn(FieldAuthorID, vs...))
}

// AuthorIDGT applies the GT predicate on the "author_id" field.
func AuthorIDGT(v string) predicate.Block {
	return predicate.Block(sql.FieldGT(FieldAuthorID, v))
}

// AuthorIDGTE applies the GTE predicate on the "author_id" field.
func AuthorIDGTE(v string) predicate.Block {
	return predicate.Block(sql.FieldGTE(FieldAuthorID, v))
}

// AuthorIDLT applies the LT predicate on the "author_id" field.
func AuthorIDLT(v string) predicate.Block {
	return predicate.Block(sql.FieldLT(FieldAuthorID, v))
}

// AuthorIDLTE applies the LTE predicate on the "author_id" field.
func AuthorIDLTE(v string) predicate.Block {
	return predicate.Block(sql.FieldLTE(FieldAuthorID, v))
}

// AuthorIDContains applies the Contains predicate on the "author_id" field.
func AuthorIDContains(v string) predicate.Block {
	return predicate.Block(sql.FieldContains(FieldAuthorID, v))
}

// AuthorIDHasPrefix applies the HasPrefix predicate on the "author_id" field.
func AuthorIDHasPrefix(v string) predicate.Block {
	return predicate.Block(sql.FieldHasPrefix(FieldAuthorID, v))
}

// AuthorIDHasSuffix applies the HasSuffix predicate on the "author_id" field.
func AuthorIDHasSuffix(v string) predicate.Block {
	return predicate.Block(sql.FieldHasSuffix(FieldAuthorID, v))
}

// AuthorIDEqualFold applies the EqualFold predicate on the "author_id" field.
func AuthorIDEqualFold(v string) predicate.Block {
	return predicate.Block(sql.FieldEqualFold(FieldAuthorID, v))
}

// AuthorIDContainsFold applies the ContainsFold predicate on the "author_id" field.
func AuthorIDContainsFold(v string) predicate.Block {
	return predicate.Block(sql.FieldContainsFold(FieldAuthorID, v))
}

// SpeedEQ applies the EQ predicate on the "speed" field.
func SpeedEQ(v float64) predicate.Block {
	return predicate.Block(sql.FieldEQ(FieldSpeed, v))
}

// SpeedNEQ applies the NEQ predicate on the "speed" field.
func SpeedNEQ(v float64) predicate.Block {
	return predicate.Block(sql.FieldNEQ(FieldSpeed, v))
}

// SpeedIn applies the In predicate on the "speed" field.
func SpeedIn(vs ...float64) predicate.Block {
	return predicate.Block(sql.FieldIn(FieldSpeed, vs...))
}

// SpeedNotIn applies the NotIn predicate on the "speed" field.
func SpeedNotIn(vs ...float64) predicate.Block {
	return predicate.Block(sql.FieldNotIn(FieldSpeed, vs...))
}

// SpeedGT applies the GT predicate on the "speed" field.
func SpeedGT(v float64) predicate.Block {
	return predicate.Block(sql.FieldGT(FieldSpeed, v))
}

// SpeedGTE applies the GTE predicate on the "speed" field.
func SpeedGTE(v float64) predicate.Block {
	return predicate.Block(sql.FieldGTE(FieldSpeed, v))
}

// SpeedLT applies the LT predicate on the "speed" field.
func SpeedLT(v float64) predicate.Block {
	return predicate.Block(sql.FieldLT(FieldSpeed, v))
}

// SpeedLTE applies the LTE predicate on the "speed" field.
func SpeedLTE(v float64) predicate.Block {
	return predicate.Block(sql.FieldLTE(FieldSpeed, v))
}

// SpeakerEQ applies the EQ predicate on the "speaker" field.
func SpeakerEQ(v string) predicate.Block {
	return predicate.Block(sql.FieldEQ(FieldSpeaker, v))
}

// SpeakerNEQ applies the NEQ predicate on the "speaker" field.
func SpeakerNEQ(v string) predicate.Block {
	return predicate.Block(sql.FieldNEQ(FieldSpeaker, v))
}

// SpeakerIn applies the In predicate on the "speaker" field.
func SpeakerIn(vs ...string) predicate.Block {
	return predicate.Block(sql.FieldIn(FieldSpeaker, vs...))
}

// SpeakerNotIn applies the NotIn predicate on the "speaker" field.
func SpeakerNotIn(vs ...string) predicate.Block {
	return predicate.Block(sql.FieldNotIn(FieldSpeaker, vs...))
}

// SpeakerGT applies the GT predicate on the "speaker" field.
func SpeakerGT(v string) predicate.Block {
	return predicate.Block(sql.FieldGT(FieldSpeaker, v))
}

// SpeakerGTE applies the GTE predicate on the "speaker" field.
func SpeakerGTE(v string) predicate.Block {
	return predicate.Block(sql.FieldGTE(FieldSpeaker, v))
}

// SpeakerLT applies the LT predicate on the "speaker" field.
func SpeakerLT(v string) predicate.Block {
	return predicate.Block(sql.FieldLT(FieldSpeaker, v))
}

// SpeakerLTE applies the LTE predicate on the "speaker" field.
func SpeakerLTE(v string) predicate.Block {
	return predicate.Block(sql.FieldLTE(FieldSpeaker, v))
}

// SpeakerContains applies the Contains predicate on the "speaker" field.
func SpeakerContains(v string) predicate.Block {
	return predicate.Block(sql.FieldContains(FieldSpeaker, v))
}

// SpeakerHasPrefix applies the HasPrefix predicate on the "speaker" field.
func SpeakerHasPrefix(v string) predicate.Block {
	return predicate.Block(sql.FieldHasPrefix(FieldSpeaker, v))
}

// SpeakerHasSuffix applies the HasSuffix predicate on the "speaker" field.
func SpeakerHasSuffix(v string) predicate.Block {
	return predicate.Block(sql.FieldHasSuffix(FieldSpeaker, v))
}

// SpeakerEqualFold applies the EqualFold predicate on the "speaker" field.
func SpeakerEqualFold(v string) predicate.Block {
	return predicate.Block(sql.FieldEqualFold(FieldSpeaker, v))
}

// SpeakerContainsFold applies the ContainsFold predicate on the "speaker" field.
func SpeakerContainsFold(v string) predicate.Block {
	return predicate.Block(sql.FieldContainsFold(FieldSpeaker, v))
}

// VolumeEQ applies the EQ predicate on the "volume" field.
func VolumeEQ(v float64) predicate.Block {
	return predicate.Block(sql.FieldEQ(FieldVolume, v))
}

// VolumeNEQ applies the NEQ predicate on the "volume" field.
func VolumeNEQ(v float64) predicate.Block {
	return predicate.Block(sql.FieldNEQ(FieldVolume, v))
}

// VolumeIn applies the In predicate on the "volume" field.
func VolumeIn(vs ...float64) predicate.Block {
	return predicate.Block(sql.FieldIn(FieldVolume, vs...))
}

// VolumeNotIn applies the NotIn predicate on the "volume" field.
func VolumeNotIn(vs ...float64) predicate.Block {
	return predicate.Block(sql.FieldNotIn(FieldVolume, vs...))
}

// VolumeGT applies the GT predicate on the "volume" field.
func VolumeGT(v float64) predicate.Block {
	return predicate.Block(sql.FieldGT(FieldVolume, v))
}

// VolumeGTE applies the GTE predicate on the "volume" field.
func VolumeGTE(v float64) predicate.Block {
	return predicate.Block(sql.FieldGTE(FieldVolume, v))
}

// VolumeLT applies the LT predicate on the "volume" field.
func VolumeLT(v float64) predicate.Block {
	return predicate.Block(sql.FieldLT(FieldVolume, v))
}

// VolumeLTE applies the LTE predicate on the "volume" field.
func VolumeLTE(v float64) predicate.Block {
	return predicate.Block(sql.FieldLTE(FieldVolume, v))
}

// PitchEQ applies the EQ predicate on the "pitch" field.
func PitchEQ(v int) predicate.Block {
	return predicate.Block(sql.FieldEQ(FieldPitch, v))
}

// PitchNEQ applies the NEQ predicate on the "pitch" field.
func PitchNEQ(v int) predicate.Block {
	return predicate.Block(sql.FieldNEQ(FieldPitch, v))
}

// PitchIn applies the In predicate on the "pitch" field.
func PitchIn(vs ...int) predicate.Block {
	return predicate.Block(sql.FieldIn(FieldPitch, vs...))
}

// PitchNotIn applies the NotIn predicate on the "pitch" field.
func PitchNotIn(vs ...int) predicate.Block {
	return predicate.Block(sql.FieldNotIn(FieldPitch, vs...))
}

// PitchGT applies the GT predicate on the "pitch" field.
func PitchGT(v int) predicate.Block {
	return predicate.Block(sql.FieldGT(FieldPitch, v))
}

// PitchGTE applies the GTE predicate on the "pitch" field.
func PitchGTE(v int) predicate.Block {
	return predicate.Block(sql.FieldGTE(FieldPitch, v))
}

// PitchLT applies the LT predicate on the "pitch" field.
func PitchLT(v int) predicate.Block {
	return predicate.Block(sql.FieldLT(FieldPitch, v))
}

// PitchLTE applies the LTE predicate on the "pitch" field.
func PitchLTE(v int) predicate.Block {
	return predicate.Block(sql.FieldLTE(FieldPitch, v))
}

// TextsEQ applies the EQ predicate on the "texts" field.
func TextsEQ(v string) predicate.Block {
	return predicate.Block(sql.FieldEQ(FieldTexts, v))
}

// TextsNEQ applies the NEQ predicate on the "texts" field.
func TextsNEQ(v string) predicate.Block {
	return predicate.Block(sql.FieldNEQ(FieldTexts, v))
}

// TextsIn applies the In predicate on the "texts" field.
func TextsIn(vs ...string) predicate.Block {
	return predicate.Block(sql.FieldIn(FieldTexts, vs...))
}

// TextsNotIn applies the NotIn predicate on the "texts" field.
func TextsNotIn(vs ...string) predicate.Block {
	return predicate.Block(sql.FieldNotIn(FieldTexts, vs...))
}

// TextsGT applies the GT predicate on the "texts" field.
func TextsGT(v string) predicate.Block {
	return predicate.Block(sql.FieldGT(FieldTexts, v))
}

// TextsGTE applies the GTE predicate on the "texts" field.
func TextsGTE(v string) predicate.Block {
	return predicate.Block(sql.FieldGTE(FieldTexts, v))
}

// TextsLT applies the LT predicate on the "texts" field.
func TextsLT(v string) predicate.Block {
	return predicate.Block(sql.FieldLT(FieldTexts, v))
}

// TextsLTE applies the LTE predicate on the "texts" field.
func TextsLTE(v string) predicate.Block {
	return predicate.Block(sql.FieldLTE(FieldTexts, v))
}

// TextsContains applies the Contains predicate on the "texts" field.
func TextsContains(v string) predicate.Block {
	return predicate.Block(sql.FieldContains(FieldTexts, v))
}

// TextsHasPrefix applies the HasPrefix predicate on the "texts" field.
func TextsHasPrefix(v string) predicate.Block {
	return predicate.Block(sql.FieldHasPrefix(FieldTexts, v))
}

// TextsHasSuffix applies the HasSuffix predicate on the "texts" field.
func TextsHasSuffix(v string) predicate.Block {
	return predicate.Block(sql.FieldHasSuffix(FieldTexts, v))
}

// TextsEqualFold applies the EqualFold predicate on the "texts" field.
func TextsEqualFold(v string) predicate.Block {
	return predicate.Block(sql.FieldEqualFold(FieldTexts, v))
}

// TextsContainsFold applies the ContainsFold predicate on the "texts" field.
func TextsContainsFold(v string) predicate.Block {
	return predicate.Block(sql.FieldContainsFold(FieldTexts, v))
}

// DurationEQ applies the EQ predicate on the "duration" field.
func DurationEQ(v int) predicate.Block {
	return predicate.Block(sql.FieldEQ(FieldDuration, v))
}

// DurationNEQ applies the NEQ predicate on the "duration" field.
func DurationNEQ(v int) predicate.Block {
	return predicate.Block(sql.FieldNEQ(FieldDuration, v))
}

// DurationIn applies the In predicate on the "duration" field.
func DurationIn(vs ...int) predicate.Block {
	return predicate.Block(sql.FieldIn(FieldDuration, vs...))
}

// DurationNotIn applies the NotIn predicate on the "duration" field.
func DurationNotIn(vs ...int) predicate.Block {
	return predicate.Block(sql.FieldNotIn(FieldDuration, vs...))
}

// DurationGT applies the GT predicate on the "duration" field.
func DurationGT(v int) predicate.Block {
	return predicate.Block(sql.FieldGT(FieldDuration, v))
}

// DurationGTE applies the GTE predicate on the "duration" field.
func DurationGTE(v int) predicate.Block {
	return predicate.Block(sql.FieldGTE(FieldDuration, v))
}

// DurationLT applies the LT predicate on the "duration" field.
func DurationLT(v int) predicate.Block {
	return predicate.Block(sql.FieldLT(FieldDuration, v))
}

// DurationLTE applies the LTE predicate on the "duration" field.
func DurationLTE(v int) predicate.Block {
	return predicate.Block(sql.FieldLTE(FieldDuration, v))
}

// PartIDEQ applies the EQ predicate on the "part_id" field.
func PartIDEQ(v string) predicate.Block {
	return predicate.Block(sql.FieldEQ(FieldPartID, v))
}

// PartIDNEQ applies the NEQ predicate on the "part_id" field.
func PartIDNEQ(v string) predicate.Block {
	return predicate.Block(sql.FieldNEQ(FieldPartID, v))
}

// PartIDIn applies the In predicate on the "part_id" field.
func PartIDIn(vs ...string) predicate.Block {
	return predicate.Block(sql.FieldIn(FieldPartID, vs...))
}

// PartIDNotIn applies the NotIn predicate on the "part_id" field.
func PartIDNotIn(vs ...string) predicate.Block {
	return predicate.Block(sql.FieldNotIn(FieldPartID, vs...))
}

// PartIDGT applies the GT predicate on the "part_id" field.
func PartIDGT(v string) predicate.Block {
	return predicate.Block(sql.FieldGT(FieldPartID, v))
}

// PartIDGTE applies the GTE predicate on the "part_id" field.
func PartIDGTE(v string) predicate.Block {
	return predicate.Block(sql.FieldGTE(FieldPartID, v))
}

// PartIDLT applies the LT predicate on the "part_id" field.
func PartIDLT(v string) predicate.Block {
	return predicate.Block(sql.FieldLT(FieldPartID, v))
}

// PartIDLTE applies the LTE predicate on the "part_id" field.
func PartIDLTE(v string) predicate.Block {
	return predicate.Block(sql.FieldLTE(FieldPartID, v))
}

// PartIDContains applies the Contains predicate on the "part_id" field.
func PartIDContains(v string) predicate.Block {
	return predicate.Block(sql.FieldContains(FieldPartID, v))
}

// PartIDHasPrefix applies the HasPrefix predicate on the "part_id" field.
func PartIDHasPrefix(v string) predicate.Block {
	return predicate.Block(sql.FieldHasPrefix(FieldPartID, v))
}

// PartIDHasSuffix applies the HasSuffix predicate on the "part_id" field.
func PartIDHasSuffix(v string) predicate.Block {
	return predicate.Block(sql.FieldHasSuffix(FieldPartID, v))
}

// PartIDEqualFold applies the EqualFold predicate on the "part_id" field.
func PartIDEqualFold(v string) predicate.Block {
	return predicate.Block(sql.FieldEqualFold(FieldPartID, v))
}

// PartIDContainsFold applies the ContainsFold predicate on the "part_id" field.
func PartIDContainsFold(v string) predicate.Block {
	return predicate.Block(sql.FieldContainsFold(FieldPartID, v))
}

// HasPart applies the HasEdge predicate on the "part" edge.
func HasPart() predicate.Block {
	return predicate.Block(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, PartTable, PartColumn),
		)
		sqlgraph.HasNeighbors(s, step)
	})
}

// HasPartWith applies the HasEdge predicate on the "part" edge with a given conditions (other predicates).
func HasPartWith(preds ...predicate.Part) predicate.Block {
	return predicate.Block(func(s *sql.Selector) {
		step := newPartStep()
		sqlgraph.HasNeighborsWith(s, step, func(s *sql.Selector) {
			for _, p := range preds {
				p(s)
			}
		})
	})
}

// And groups predicates with the AND operator between them.
func And(predicates ...predicate.Block) predicate.Block {
	return predicate.Block(sql.AndPredicates(predicates...))
}

// Or groups predicates with the OR operator between them.
func Or(predicates ...predicate.Block) predicate.Block {
	return predicate.Block(sql.OrPredicates(predicates...))
}

// Not applies the not operator on the given predicate.
func Not(p predicate.Block) predicate.Block {
	return predicate.Block(sql.NotPredicates(p))
}
