// Code generated by ent, DO NOT EDIT.

package ent

import (
	"context"
	"errors"
	"fmt"
	"graphql-test-api/ent/block"
	"graphql-test-api/ent/part"
	"graphql-test-api/ent/predicate"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
)

// BlockUpdate is the builder for updating Block entities.
type BlockUpdate struct {
	config
	hooks    []Hook
	mutation *BlockMutation
}

// Where appends a list predicates to the BlockUpdate builder.
func (bu *BlockUpdate) Where(ps ...predicate.Block) *BlockUpdate {
	bu.mutation.Where(ps...)
	return bu
}

// SetAuthorID sets the "author_id" field.
func (bu *BlockUpdate) SetAuthorID(s string) *BlockUpdate {
	bu.mutation.SetAuthorID(s)
	return bu
}

// SetNillableAuthorID sets the "author_id" field if the given value is not nil.
func (bu *BlockUpdate) SetNillableAuthorID(s *string) *BlockUpdate {
	if s != nil {
		bu.SetAuthorID(*s)
	}
	return bu
}

// SetSpeed sets the "speed" field.
func (bu *BlockUpdate) SetSpeed(f float64) *BlockUpdate {
	bu.mutation.ResetSpeed()
	bu.mutation.SetSpeed(f)
	return bu
}

// SetNillableSpeed sets the "speed" field if the given value is not nil.
func (bu *BlockUpdate) SetNillableSpeed(f *float64) *BlockUpdate {
	if f != nil {
		bu.SetSpeed(*f)
	}
	return bu
}

// AddSpeed adds f to the "speed" field.
func (bu *BlockUpdate) AddSpeed(f float64) *BlockUpdate {
	bu.mutation.AddSpeed(f)
	return bu
}

// SetSpeaker sets the "speaker" field.
func (bu *BlockUpdate) SetSpeaker(s string) *BlockUpdate {
	bu.mutation.SetSpeaker(s)
	return bu
}

// SetNillableSpeaker sets the "speaker" field if the given value is not nil.
func (bu *BlockUpdate) SetNillableSpeaker(s *string) *BlockUpdate {
	if s != nil {
		bu.SetSpeaker(*s)
	}
	return bu
}

// SetVolume sets the "volume" field.
func (bu *BlockUpdate) SetVolume(f float64) *BlockUpdate {
	bu.mutation.ResetVolume()
	bu.mutation.SetVolume(f)
	return bu
}

// SetNillableVolume sets the "volume" field if the given value is not nil.
func (bu *BlockUpdate) SetNillableVolume(f *float64) *BlockUpdate {
	if f != nil {
		bu.SetVolume(*f)
	}
	return bu
}

// AddVolume adds f to the "volume" field.
func (bu *BlockUpdate) AddVolume(f float64) *BlockUpdate {
	bu.mutation.AddVolume(f)
	return bu
}

// SetPitch sets the "pitch" field.
func (bu *BlockUpdate) SetPitch(i int) *BlockUpdate {
	bu.mutation.ResetPitch()
	bu.mutation.SetPitch(i)
	return bu
}

// SetNillablePitch sets the "pitch" field if the given value is not nil.
func (bu *BlockUpdate) SetNillablePitch(i *int) *BlockUpdate {
	if i != nil {
		bu.SetPitch(*i)
	}
	return bu
}

// AddPitch adds i to the "pitch" field.
func (bu *BlockUpdate) AddPitch(i int) *BlockUpdate {
	bu.mutation.AddPitch(i)
	return bu
}

// SetTexts sets the "texts" field.
func (bu *BlockUpdate) SetTexts(s string) *BlockUpdate {
	bu.mutation.SetTexts(s)
	return bu
}

// SetNillableTexts sets the "texts" field if the given value is not nil.
func (bu *BlockUpdate) SetNillableTexts(s *string) *BlockUpdate {
	if s != nil {
		bu.SetTexts(*s)
	}
	return bu
}

// SetDuration sets the "duration" field.
func (bu *BlockUpdate) SetDuration(i int) *BlockUpdate {
	bu.mutation.ResetDuration()
	bu.mutation.SetDuration(i)
	return bu
}

// SetNillableDuration sets the "duration" field if the given value is not nil.
func (bu *BlockUpdate) SetNillableDuration(i *int) *BlockUpdate {
	if i != nil {
		bu.SetDuration(*i)
	}
	return bu
}

// AddDuration adds i to the "duration" field.
func (bu *BlockUpdate) AddDuration(i int) *BlockUpdate {
	bu.mutation.AddDuration(i)
	return bu
}

// SetPartID sets the "part_id" field.
func (bu *BlockUpdate) SetPartID(s string) *BlockUpdate {
	bu.mutation.SetPartID(s)
	return bu
}

// SetNillablePartID sets the "part_id" field if the given value is not nil.
func (bu *BlockUpdate) SetNillablePartID(s *string) *BlockUpdate {
	if s != nil {
		bu.SetPartID(*s)
	}
	return bu
}

// SetPart sets the "part" edge to the Part entity.
func (bu *BlockUpdate) SetPart(p *Part) *BlockUpdate {
	return bu.SetPartID(p.ID)
}

// Mutation returns the BlockMutation object of the builder.
func (bu *BlockUpdate) Mutation() *BlockMutation {
	return bu.mutation
}

// ClearPart clears the "part" edge to the Part entity.
func (bu *BlockUpdate) ClearPart() *BlockUpdate {
	bu.mutation.ClearPart()
	return bu
}

// Save executes the query and returns the number of nodes affected by the update operation.
func (bu *BlockUpdate) Save(ctx context.Context) (int, error) {
	return withHooks(ctx, bu.sqlSave, bu.mutation, bu.hooks)
}

// SaveX is like Save, but panics if an error occurs.
func (bu *BlockUpdate) SaveX(ctx context.Context) int {
	affected, err := bu.Save(ctx)
	if err != nil {
		panic(err)
	}
	return affected
}

// Exec executes the query.
func (bu *BlockUpdate) Exec(ctx context.Context) error {
	_, err := bu.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (bu *BlockUpdate) ExecX(ctx context.Context) {
	if err := bu.Exec(ctx); err != nil {
		panic(err)
	}
}

// check runs all checks and user-defined validators on the builder.
func (bu *BlockUpdate) check() error {
	if _, ok := bu.mutation.PartID(); bu.mutation.PartCleared() && !ok {
		return errors.New(`ent: clearing a required unique edge "Block.part"`)
	}
	return nil
}

func (bu *BlockUpdate) sqlSave(ctx context.Context) (n int, err error) {
	if err := bu.check(); err != nil {
		return n, err
	}
	_spec := sqlgraph.NewUpdateSpec(block.Table, block.Columns, sqlgraph.NewFieldSpec(block.FieldID, field.TypeString))
	if ps := bu.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := bu.mutation.AuthorID(); ok {
		_spec.SetField(block.FieldAuthorID, field.TypeString, value)
	}
	if value, ok := bu.mutation.Speed(); ok {
		_spec.SetField(block.FieldSpeed, field.TypeFloat64, value)
	}
	if value, ok := bu.mutation.AddedSpeed(); ok {
		_spec.AddField(block.FieldSpeed, field.TypeFloat64, value)
	}
	if value, ok := bu.mutation.Speaker(); ok {
		_spec.SetField(block.FieldSpeaker, field.TypeString, value)
	}
	if value, ok := bu.mutation.Volume(); ok {
		_spec.SetField(block.FieldVolume, field.TypeFloat64, value)
	}
	if value, ok := bu.mutation.AddedVolume(); ok {
		_spec.AddField(block.FieldVolume, field.TypeFloat64, value)
	}
	if value, ok := bu.mutation.Pitch(); ok {
		_spec.SetField(block.FieldPitch, field.TypeInt, value)
	}
	if value, ok := bu.mutation.AddedPitch(); ok {
		_spec.AddField(block.FieldPitch, field.TypeInt, value)
	}
	if value, ok := bu.mutation.Texts(); ok {
		_spec.SetField(block.FieldTexts, field.TypeString, value)
	}
	if value, ok := bu.mutation.Duration(); ok {
		_spec.SetField(block.FieldDuration, field.TypeInt, value)
	}
	if value, ok := bu.mutation.AddedDuration(); ok {
		_spec.AddField(block.FieldDuration, field.TypeInt, value)
	}
	if bu.mutation.PartCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   block.PartTable,
			Columns: []string{block.PartColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(part.FieldID, field.TypeString),
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := bu.mutation.PartIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   block.PartTable,
			Columns: []string{block.PartColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(part.FieldID, field.TypeString),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if n, err = sqlgraph.UpdateNodes(ctx, bu.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{block.Label}
		} else if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{msg: err.Error(), wrap: err}
		}
		return 0, err
	}
	bu.mutation.done = true
	return n, nil
}

// BlockUpdateOne is the builder for updating a single Block entity.
type BlockUpdateOne struct {
	config
	fields   []string
	hooks    []Hook
	mutation *BlockMutation
}

// SetAuthorID sets the "author_id" field.
func (buo *BlockUpdateOne) SetAuthorID(s string) *BlockUpdateOne {
	buo.mutation.SetAuthorID(s)
	return buo
}

// SetNillableAuthorID sets the "author_id" field if the given value is not nil.
func (buo *BlockUpdateOne) SetNillableAuthorID(s *string) *BlockUpdateOne {
	if s != nil {
		buo.SetAuthorID(*s)
	}
	return buo
}

// SetSpeed sets the "speed" field.
func (buo *BlockUpdateOne) SetSpeed(f float64) *BlockUpdateOne {
	buo.mutation.ResetSpeed()
	buo.mutation.SetSpeed(f)
	return buo
}

// SetNillableSpeed sets the "speed" field if the given value is not nil.
func (buo *BlockUpdateOne) SetNillableSpeed(f *float64) *BlockUpdateOne {
	if f != nil {
		buo.SetSpeed(*f)
	}
	return buo
}

// AddSpeed adds f to the "speed" field.
func (buo *BlockUpdateOne) AddSpeed(f float64) *BlockUpdateOne {
	buo.mutation.AddSpeed(f)
	return buo
}

// SetSpeaker sets the "speaker" field.
func (buo *BlockUpdateOne) SetSpeaker(s string) *BlockUpdateOne {
	buo.mutation.SetSpeaker(s)
	return buo
}

// SetNillableSpeaker sets the "speaker" field if the given value is not nil.
func (buo *BlockUpdateOne) SetNillableSpeaker(s *string) *BlockUpdateOne {
	if s != nil {
		buo.SetSpeaker(*s)
	}
	return buo
}

// SetVolume sets the "volume" field.
func (buo *BlockUpdateOne) SetVolume(f float64) *BlockUpdateOne {
	buo.mutation.ResetVolume()
	buo.mutation.SetVolume(f)
	return buo
}

// SetNillableVolume sets the "volume" field if the given value is not nil.
func (buo *BlockUpdateOne) SetNillableVolume(f *float64) *BlockUpdateOne {
	if f != nil {
		buo.SetVolume(*f)
	}
	return buo
}

// AddVolume adds f to the "volume" field.
func (buo *BlockUpdateOne) AddVolume(f float64) *BlockUpdateOne {
	buo.mutation.AddVolume(f)
	return buo
}

// SetPitch sets the "pitch" field.
func (buo *BlockUpdateOne) SetPitch(i int) *BlockUpdateOne {
	buo.mutation.ResetPitch()
	buo.mutation.SetPitch(i)
	return buo
}

// SetNillablePitch sets the "pitch" field if the given value is not nil.
func (buo *BlockUpdateOne) SetNillablePitch(i *int) *BlockUpdateOne {
	if i != nil {
		buo.SetPitch(*i)
	}
	return buo
}

// AddPitch adds i to the "pitch" field.
func (buo *BlockUpdateOne) AddPitch(i int) *BlockUpdateOne {
	buo.mutation.AddPitch(i)
	return buo
}

// SetTexts sets the "texts" field.
func (buo *BlockUpdateOne) SetTexts(s string) *BlockUpdateOne {
	buo.mutation.SetTexts(s)
	return buo
}

// SetNillableTexts sets the "texts" field if the given value is not nil.
func (buo *BlockUpdateOne) SetNillableTexts(s *string) *BlockUpdateOne {
	if s != nil {
		buo.SetTexts(*s)
	}
	return buo
}

// SetDuration sets the "duration" field.
func (buo *BlockUpdateOne) SetDuration(i int) *BlockUpdateOne {
	buo.mutation.ResetDuration()
	buo.mutation.SetDuration(i)
	return buo
}

// SetNillableDuration sets the "duration" field if the given value is not nil.
func (buo *BlockUpdateOne) SetNillableDuration(i *int) *BlockUpdateOne {
	if i != nil {
		buo.SetDuration(*i)
	}
	return buo
}

// AddDuration adds i to the "duration" field.
func (buo *BlockUpdateOne) AddDuration(i int) *BlockUpdateOne {
	buo.mutation.AddDuration(i)
	return buo
}

// SetPartID sets the "part_id" field.
func (buo *BlockUpdateOne) SetPartID(s string) *BlockUpdateOne {
	buo.mutation.SetPartID(s)
	return buo
}

// SetNillablePartID sets the "part_id" field if the given value is not nil.
func (buo *BlockUpdateOne) SetNillablePartID(s *string) *BlockUpdateOne {
	if s != nil {
		buo.SetPartID(*s)
	}
	return buo
}

// SetPart sets the "part" edge to the Part entity.
func (buo *BlockUpdateOne) SetPart(p *Part) *BlockUpdateOne {
	return buo.SetPartID(p.ID)
}

// Mutation returns the BlockMutation object of the builder.
func (buo *BlockUpdateOne) Mutation() *BlockMutation {
	return buo.mutation
}

// ClearPart clears the "part" edge to the Part entity.
func (buo *BlockUpdateOne) ClearPart() *BlockUpdateOne {
	buo.mutation.ClearPart()
	return buo
}

// Where appends a list predicates to the BlockUpdate builder.
func (buo *BlockUpdateOne) Where(ps ...predicate.Block) *BlockUpdateOne {
	buo.mutation.Where(ps...)
	return buo
}

// Select allows selecting one or more fields (columns) of the returned entity.
// The default is selecting all fields defined in the entity schema.
func (buo *BlockUpdateOne) Select(field string, fields ...string) *BlockUpdateOne {
	buo.fields = append([]string{field}, fields...)
	return buo
}

// Save executes the query and returns the updated Block entity.
func (buo *BlockUpdateOne) Save(ctx context.Context) (*Block, error) {
	return withHooks(ctx, buo.sqlSave, buo.mutation, buo.hooks)
}

// SaveX is like Save, but panics if an error occurs.
func (buo *BlockUpdateOne) SaveX(ctx context.Context) *Block {
	node, err := buo.Save(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// Exec executes the query on the entity.
func (buo *BlockUpdateOne) Exec(ctx context.Context) error {
	_, err := buo.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (buo *BlockUpdateOne) ExecX(ctx context.Context) {
	if err := buo.Exec(ctx); err != nil {
		panic(err)
	}
}

// check runs all checks and user-defined validators on the builder.
func (buo *BlockUpdateOne) check() error {
	if _, ok := buo.mutation.PartID(); buo.mutation.PartCleared() && !ok {
		return errors.New(`ent: clearing a required unique edge "Block.part"`)
	}
	return nil
}

func (buo *BlockUpdateOne) sqlSave(ctx context.Context) (_node *Block, err error) {
	if err := buo.check(); err != nil {
		return _node, err
	}
	_spec := sqlgraph.NewUpdateSpec(block.Table, block.Columns, sqlgraph.NewFieldSpec(block.FieldID, field.TypeString))
	id, ok := buo.mutation.ID()
	if !ok {
		return nil, &ValidationError{Name: "id", err: errors.New(`ent: missing "Block.id" for update`)}
	}
	_spec.Node.ID.Value = id
	if fields := buo.fields; len(fields) > 0 {
		_spec.Node.Columns = make([]string, 0, len(fields))
		_spec.Node.Columns = append(_spec.Node.Columns, block.FieldID)
		for _, f := range fields {
			if !block.ValidColumn(f) {
				return nil, &ValidationError{Name: f, err: fmt.Errorf("ent: invalid field %q for query", f)}
			}
			if f != block.FieldID {
				_spec.Node.Columns = append(_spec.Node.Columns, f)
			}
		}
	}
	if ps := buo.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := buo.mutation.AuthorID(); ok {
		_spec.SetField(block.FieldAuthorID, field.TypeString, value)
	}
	if value, ok := buo.mutation.Speed(); ok {
		_spec.SetField(block.FieldSpeed, field.TypeFloat64, value)
	}
	if value, ok := buo.mutation.AddedSpeed(); ok {
		_spec.AddField(block.FieldSpeed, field.TypeFloat64, value)
	}
	if value, ok := buo.mutation.Speaker(); ok {
		_spec.SetField(block.FieldSpeaker, field.TypeString, value)
	}
	if value, ok := buo.mutation.Volume(); ok {
		_spec.SetField(block.FieldVolume, field.TypeFloat64, value)
	}
	if value, ok := buo.mutation.AddedVolume(); ok {
		_spec.AddField(block.FieldVolume, field.TypeFloat64, value)
	}
	if value, ok := buo.mutation.Pitch(); ok {
		_spec.SetField(block.FieldPitch, field.TypeInt, value)
	}
	if value, ok := buo.mutation.AddedPitch(); ok {
		_spec.AddField(block.FieldPitch, field.TypeInt, value)
	}
	if value, ok := buo.mutation.Texts(); ok {
		_spec.SetField(block.FieldTexts, field.TypeString, value)
	}
	if value, ok := buo.mutation.Duration(); ok {
		_spec.SetField(block.FieldDuration, field.TypeInt, value)
	}
	if value, ok := buo.mutation.AddedDuration(); ok {
		_spec.AddField(block.FieldDuration, field.TypeInt, value)
	}
	if buo.mutation.PartCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   block.PartTable,
			Columns: []string{block.PartColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(part.FieldID, field.TypeString),
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := buo.mutation.PartIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   block.PartTable,
			Columns: []string{block.PartColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(part.FieldID, field.TypeString),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	_node = &Block{config: buo.config}
	_spec.Assign = _node.assignValues
	_spec.ScanValues = _node.scanValues
	if err = sqlgraph.UpdateNode(ctx, buo.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{block.Label}
		} else if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{msg: err.Error(), wrap: err}
		}
		return nil, err
	}
	buo.mutation.done = true
	return _node, nil
}
